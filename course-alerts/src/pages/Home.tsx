import '../App.css'
import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import TextField from '@mui/material/TextField';
// import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import Courses from './Courses.tsx';


const CustomAutocomplete = withStyles({
  option: { // options in dropdown
    backgroundColor: '#64748b',
    fontFamily: 'RotundaLight',
    '&:hover': {
      backgroundColor: 'yourHoverColor',
    },
  },
  noOptions: {
    backgroundColor: '#64748b',
    fontFamily: 'RotundaLight',
  },
  paper: { // dropdown itself
    backgroundColor: '#64748b',
  },
})(Autocomplete);

const CustomTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
      fontFamily: 'RotundaLight',
    },
    '& .MuiOutlinedInput-root': {
      borderColor: 'white',
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      }
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'RotundaLight',
      '&.Mui-focused': {
        color: 'red !important',
      }
    },
  },
})(TextField);

const CustomSelect = withStyles({

  select: {
    backgroundColor: 'white',
    fontFamily: 'RotundaLight',
  },
  root: {
    width: '100%',
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
    },
    '& .MuiInputLabel-root': {
      fontFamily: 'RotundaLight',

    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
    },


  },
})(Select);

const CustomMenuItem = withStyles({
  root: {
    fontFamily: 'RotundaLight !important', // replace 'yourFontFamily' with your desired font family
  },
})(MenuItem);

const CustomInputLabel = withStyles({
  root: {
    fontFamily: 'RotundaLight !important',
    color: '#71717a !important',
    '&.Mui-focused': {
      color: 'red !important',
    }
  }
})(InputLabel)



function Home() {
  const navigate = useNavigate();
  const [courseNumber, setCourseNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [department, setDepartment] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;
  const name = user != null ? user.displayName : null;
  const email = user != null ? user.email : null;
  console.log(email)


  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user == null) {
          navigate('/')
    }
  }, [navigate])

  async function getCourses(email: string) {
    if (email != null) {
      await axios.get('https://receivedata-ph7t7gmwya-uc.a.run.app/getCourses', {
        params: {
          email: email
        }
      }).then((response) => {
        setCourses(response.data)
      })
    }
  }

  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses(email)
  }, [email])

  async function removecourse(courses: { crs: string, sem: string, sec: string, dept: string }) {
    if (email != null) {
      await axios.get('https://receivedata-ph7t7gmwya-uc.a.run.app/removeCourse', {
        params: {
          email: email,
          course: JSON.stringify(courses)
        }
      }).then((response) => {
        console.log(response)
        getCourses(email)
      })
    }
    setTimeout(() => {
      getCourses(email)
    }, 400)
  }

  console.log(courses)


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const email = user != null ? user.email : null;
    console.log(email)
    console.log(courseNumber)
    console.log(semester)
    console.log(section)
    console.log(department)

    const courses = JSON.stringify({
      crs: courseNumber,
      sem: semester,
      sec: section,
      dept: department,
      sch: department.charAt(0)
    })
    axios.get('https://receivedata-ph7t7gmwya-uc.a.run.app/receiveCourses', {
      params: {
        courses: courses,
        email: email
      }
    }).then((response) => {
      console.log(response)
      setCourseNumber('')
      setSection('')
      getCourses(email)
    })
    setTimeout(() => {
      getCourses(email)
    }, 400)
  }


  const handleSignOut = async () => {
    const auth = getAuth();
    await auth.signOut();
    navigate('/')
  };

  return (
    <>
      <div className='absolute top-5 right-5 z-10'>
        <button className="bg-gray-500 text-gray-900 fixed right-10 top-10 ring-0 focus:outline-none" onClick={handleSignOut}>Sign Out</button>
      </div>
      <div>
        <div className="absolute m-auto left-0 right-0 top-10 pt-10 justify-center">
          <h1>Add Your Courses Here!</h1>
        </div>
        <div className='absolute left-5 top-5 z-10 w-2/12'>
          <img src="https://acac.wustl.edu/wp-content/themes/acac-theme/assets/images/wustllogo.svg" className='invert'></img>
        </div>
        <div className='flex justify-center items-center h-1/6'>
          <div>
            Hey {name}!
            <div className='flex flex-col justify-normal overflow-auto h-[65vh]'>
            {courses.map((course, index) => (
              <Courses index={index} courses={course} removecourse={removecourse} />
            )
            )}
            </div>
          </div>
          <div className="w-1/2 mx-auto pt-10 p-5">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col w-full">
                <FormControl variant="outlined" className="w-full">
                  <CustomInputLabel style={{ fontFamily: 'RotundaLight' }} id="semester-label">Semester</CustomInputLabel>
                  <CustomSelect
                    labelId="semester-label"
                    id="dropdown"
                    style={{
                      backgroundColor: 'white',
                      fontFamily: 'RotundaLight'
                    }}
                    sx={{

                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: 'RotundaLight',
                        color: 'red',
                      },
                      '&.Mui-focused .MuiInputLabel-root': {
                        color: 'red',
                      }
                    }}
                    onChange={(e) => setSemester(e.target.value as string)}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          backgroundColor: '#64748b',
                          fontFamily: 'RotundaLight',
                        },
                      },
                    }}
                  >
                    {/* <CustomMenuItem value=""><em>Semester</em></CustomMenuItem> */}
                    {/* <CustomMenuItem value="FL2023">FL23</CustomMenuItem> */}
                    <CustomMenuItem value="SP2024">SP2024</CustomMenuItem>
                    {/* <CustomMenuItem value="FL2024">FL24</CustomMenuItem> */}
                  </CustomSelect>
                </FormControl>
              </div>

              <br />
              {/* <input type="text" name={department} onChange={(e) => setDepartment(e.target.value)} /> */}
              <CustomAutocomplete
                id="combo-box-demo"
                options={departments}
                getOptionLabel={(option) => (option as any).name}
                getOptionSelected={(o, v) => (o as any)?.name === (v as any)?.name}
                onChange={(_, newValue) => {
                  setDepartment(newValue ? (newValue as any).code : '');
                }}
                renderInput={(params) => <CustomTextField {...params} label="Department" variant="outlined" />}
              />
              <br />
              {/* <label>
                        Course Number:
                        <input type="text" name={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} />
                    </label> */}
              <CustomTextField
                variant="outlined"
                value={courseNumber}
                name={section}
                onChange={(e) => setCourseNumber(e.target.value)}
                placeholder="Course Number (eg. 132)"
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  fontFamily: 'RotundaLight',
                  borderRadius: '5px'
                }}
                sx={{
                  '& .MuiOutlinedINput-root': {
                    borderRadius: '5px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: 'RotundaLight',
                    color: 'red',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: 'red',
                  },
                }}
              />
              <br />
              <br />
              <CustomTextField
                variant="outlined"
                name={section}
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="Section Number (eg. 01)"
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  fontFamily: 'RotundaLight',
                  borderRadius: '5px'
                }}
                sx={{
                  '& .MuiOutlinedINput-root': {
                    borderRadius: '5px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: 'RotundaLight',
                    color: 'red',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: 'red',
                  },
                }}
              />
              <br />
              <input type="submit" className="button text-gray-800 p-5 w-7/12 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer" value="Submit" />
            </form>

          </div>
        </div>
      </div>


    </>
  )
}

interface Department {
  code: string;
  name: string;
}

const departments: Department[] = [
  { 'code': 'L90', 'name': 'AFRICAN AND AFRICAN-AMERICAN STUDIES' },
  { 'code': 'L98', 'name': 'AMERICAN CULTURE STUDIES' },
  { 'code': 'L48', 'name': 'ANTHROPOLOGY' },
  { 'code': 'L92', 'name': 'APPLIED LINGUISTICS' },
  { 'code': 'L49', 'name': 'ARABIC' },
  { 'code': 'L52', 'name': 'ARCHAEOLOGY' },
  { 'code': 'L01', 'name': 'ART HISTORY AND ARCHAEOLOGY' },
  { 'code': 'L46', 'name': 'ASIAN AMERICAN STUDIES' },
  { 'code': 'L86', 'name': 'BIOLOGICAL & PHYSICAL SCIENCES FOR PBPM' },
  { 'code': 'L41', 'name': 'BIOLOGY AND BIOMEDICAL SCIENCES' },
  { 'code': 'L56', 'name': 'CENTER FOR THE HUMANITIES' },
  { 'code': 'L07', 'name': 'CHEMISTRY' },
  { 'code': 'L66', 'name': "CHILDREN'S STUDIES" },
  { 'code': 'L04', 'name': 'CHINESE' },
  { 'code': 'L08', 'name': 'CLASSICS' },
  { 'code': 'L59', 'name': 'COLLEGE WRITING PROGRAM' },
  { 'code': 'L16', 'name': 'COMPARATIVE LITERATURE' },
  { 'code': 'L29', 'name': 'DANCE' },
  { 'code': 'L15', 'name': 'DRAMA' },
  { 'code': 'L19', 'name': 'EARTH, ENVIRONMENTAL & PLANETARY SCIENCE' },
  { 'code': 'L81', 'name': 'EAST ASIAN LANGUAGES & CULTURES' },
  { 'code': 'L11', 'name': 'ECONOMICS' },
  { 'code': 'L12', 'name': 'EDUCATION' },
  { 'code': 'L14', 'name': 'ENGLISH LITERATURE' },
  { 'code': 'L82', 'name': 'ENVIRONMENTAL STUDIES' },
  { 'code': 'L53', 'name': 'FILM AND MEDIA STUDIES' },
  { 'code': 'L61', 'name': 'FIRST-YEAR PROGRAMS' },
  { 'code': 'L34', 'name': 'FRENCH' },
  { 'code': 'L43', 'name': 'GENERAL STUDIES' },
  { 'code': 'L21', 'name': 'GERMANIC LANGUAGES AND LITERATURES' },
  { 'code': 'L97', 'name': 'GLOBAL STUDIES' },
  { 'code': 'L09', 'name': 'GREEK' },
  { 'code': 'L74', 'name': 'HEBREW' },
  { 'code': 'L73', 'name': 'HINDI' },
  { 'code': 'L22', 'name': 'HISTORY' },
  { 'code': 'L93', 'name': 'INTERDISCIPLINARY PROJECT IN THE HUMANITIES' },
  { 'code': 'L36', 'name': 'ITALIAN' },
  { 'code': 'L05', 'name': 'JAPANESE' },
  { 'code': 'L75', 'name': 'JEWISH, ISLAMIC AND MIDDLE EAST STUDIES' },
  { 'code': 'L51', 'name': 'KOREAN' },
  { 'code': 'L10', 'name': 'LATIN' },
  { 'code': 'L45', 'name': 'LATIN AMERICAN STUDIES' },
  { 'code': 'L84', 'name': 'LEGAL STUDIES' },
  { 'code': 'L44', 'name': 'LINGUISTICS' },
  { 'code': 'L24', 'name': 'MATHEMATICS AND STATISTICS' },
  { 'code': 'L85', 'name': 'MEDICAL HUMANITIES' },
  { 'code': 'L63', 'name': 'MOVEMENT SCIENCE' },
  { 'code': 'L27', 'name': 'MUSIC' },
  { 'code': 'L88', 'name': 'NURSING SCIENCE' },
  { 'code': 'L99', 'name': 'OVERSEAS PROGRAMS' },
  { 'code': 'L30', 'name': 'PHILOSOPHY' },
  { 'code': 'L64', 'name': 'PHILOSOPHY-NEUROSCIENCE-PSYCHOLOGY' },
  { 'code': 'L28', 'name': 'PHYSICAL EDUCATION' },
  { 'code': 'L31', 'name': 'PHYSICS' },
  { 'code': 'L32', 'name': 'POLITICAL SCIENCE' },
  { 'code': 'L37', 'name': 'PORTUGUESE' },
  { 'code': 'L62', 'name': 'PRAXIS' },
  { 'code': 'L33', 'name': 'PSYCHOLOGICAL & BRAIN SCIENCES' },
  { 'code': 'L57', 'name': 'RELIGION AND POLITICS' },
  { 'code': 'L23', 'name': 'RELIGIOUS STUDIES' },
  { 'code': 'L39', 'name': 'RUSSIAN' },
  { 'code': 'L40', 'name': 'SOCIOLOGY' },
  { 'code': 'L38', 'name': 'SPANISH' },
  { 'code': 'L89', 'name': 'SPEECH AND HEARING' },
  { 'code': 'LGS', 'name': 'THE GRADUATE SCHOOL' },
  { 'code': 'L18', 'name': 'URBAN STUDIES' },
  { 'code': 'L77', 'name': 'WOMEN, GENDER, AND SEXUALITY STUDIES' },
  { 'code': 'L13', 'name': 'WRITING' },
  { "code": "E62", "name": "BIOMEDICAL ENGINEERING" },
  { "code": "E81", "name": "COMPUTER SCIENCE AND ENGINEERING" },
  { "code": "E35", "name": "ELECTRICAL AND SYSTEMS ENGINEERING" },
  { "code": "E44", "name": "ENERGY, ENVIRONMENTAL AND CHEMICAL ENGR" },
  { "code": "EGS", "name": "ENGINEERING GRADUATE STUDIES" },
  { "code": "E60", "name": "GENERAL ENGINEERING" },
  { "code": "E37", "name": "MECHANICAL ENGINEERING & MATERIALS SCIENCE" },
  { "code": "B53", "name": "MANAGEMENT (B53)" },
  { "code": "B50", "name": "ACCOUNTING (B50)" },
  { "code": "B54", "name": "MANAGERIAL ECONOMICS (B54)" },
  { "code": "B60", "name": "ACCOUNTING (B60)" },
  { "code": "B64", "name": "MANAGERIAL ECONOMICS (B64)" },
  { "code": "B51", "name": "ADMINISTRATION" },
  { "code": "B65", "name": "MARKETING (B65)" },
  { "code": "B69", "name": "DATA ANALYTICS (B69)" },
  { "code": "B55", "name": "MARKETING (B55)" },
  { "code": "B59", "name": "DATA ANALYTICS (B59)" },
  { "code": "B56", "name": "ORGANIZATIONAL BEHAVIOR (B56)" },
  { "code": "B62", "name": "FINANCE (B62)" },
  { "code": "B66", "name": "ORGANIZATIONAL BEHAVIOR (B66)" },
  { "code": "B52", "name": "FINANCE (B52)" },
  { "code": "B67", "name": "SUPPLY CHAIN, OPERATIONS, AND TECHNOLOGY (B67)" },
  { "code": "B99", "name": "INTERNATIONAL STUDIES" },
  { "code": "B57", "name": "SUPPLY CHAIN, OPERATIONS, AND TECHNOLOGY (B57)" },
  { "code": "B63", "name": "MANAGEMENT (B63)" },
  { "code": "A46", "name": "ARCHITECTURE" },
  { "code": "A48", "name": "LANDSCAPE ARCHITECTURE" },
  { "code": "A49", "name": "URBAN DESIGN" },
  { "code": "F10", "name": "ART (CORE AND MAJOR STUDIO COURSES)" },
  { "code": "F20", "name": "ART (ELECTIVE STUDIO COURSES)" }


]

export default Home