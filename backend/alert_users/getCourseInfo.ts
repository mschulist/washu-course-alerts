import axios, { AxiosRequestConfig } from "axios";
import "dotenv/config";
import {JSDOM} from "jsdom";
// import * as fs from "fs";

// Utility for caching a network GET request to a file, rather than re-requesting every time
// const cacheFilePath = "cache.html";

// async function getCachedOrFetchData(url: string, config?: AxiosRequestConfig<any>) {
//     if (fs.existsSync(cacheFilePath))
//         return fs.readFileSync(cacheFilePath, "utf-8");

//     console.log("getting...");
//     const response = await axios.get(url, config);
//     fs.writeFileSync(cacheFilePath, response.data);

//     return response.data;
// }

async function getCourseInfo(sem: string, sch: string, dept: string, crs: string): Promise<string> {
    const uri = "https://acadinfo.wustl.edu/CourseListings/CourseInfo.aspx";

    const config = {
        params: { sem, sch, dept, crs },
    };

    // return await getCachedOrFetchData(uri, config);
    const res = await axios.get(uri, config);
    return res.data;
}

// This function is very error prone
// Returns: [seats, enroll, waits] | null
async function getSectionSeats(sem: string, sch: string, dept: string, crs: string, sec: string) {
    try {
        let html = await getCourseInfo(sem, sch, dept, crs);

        let dom = new JSDOM(html);
        const document = dom.window.document;


        // We assume there is exactly one element
        // NOTE: This breaks if the site changes their html setup
        const table = document.querySelector(".ResultTable")!;
        const sections = table.querySelectorAll("table.MainTableRow");

        for (const section of sections) {
            const row = section.querySelector("tr")!;
            const section_id = row.children[1].innerHTML;

            if (section_id == sec)
                return [...row.children].slice(row.childElementCount - 3).map(x => parseFloat(x.innerHTML));
        }

        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}


export { getSectionSeats };
