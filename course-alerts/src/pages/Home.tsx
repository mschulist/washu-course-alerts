import '../App.css'
import { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@mui/material';

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
      color: '#71717a !important' , 
      '&.Mui-focused': {
            color: 'red !important',
        }
    }
  })(InputLabel)



function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user != null ? user.email : null;
        console.log(courseNumber)
        console.log(semester)
        console.log(section)
        console.log(department)

        const courses = JSON.stringify({
            crs: courseNumber,
            sem: semester,
            sec: section,
            dept: department,
            sch: "L"
        })
        axios.get('http://localhost:3000/receiveCourses', {
            params: {
                courses: courses,
                email: email
            }
        })
    }

    const getName = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user != null) {
            return user.displayName
        } else {
            return null
        }
    }

    const name = getName();
    if (name === '' && name != null) {
        setUser(name);
    }

    const handleSignOut = () => {
        const auth = getAuth();
        auth.signOut();
        navigate('/')
      };

    return (
        <>
        <div>
                <button className="bg-gray-500 text-gray-900 fixed right-10 top-10 ring-0 focus:outline-none" onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className="justify-center">
            <div className="justify-center">
                <h1>Welcome {user}</h1>
            </div>
            <div className="w-1/2 mx-auto pt-10">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full">
                    <FormControl variant="outlined" className="w-full">
                        <CustomInputLabel style={{fontFamily: 'RotundaLight'}} id="semester-label">Semester</CustomInputLabel>
                        <CustomSelect
                            labelId="semester-label"
                            id="dropdown"
                            value={semester}
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
                            onChange={(e) => setSemester(e.target.value)}
                            MenuProps={{
                                PaperProps: {
                                  style: {
                                    backgroundColor: '#64748b',
                                    fontFamily: 'RotundaLight',
                                  },
                                },
                              }}
                        >
                            <CustomMenuItem value=""><em>Semester</em></CustomMenuItem>
                            <CustomMenuItem value="option1">FL23</CustomMenuItem>
                            <CustomMenuItem value="option2">SP24</CustomMenuItem>
                            <CustomMenuItem value="option3">FL24</CustomMenuItem>
                        </CustomSelect>
                    </FormControl>
                    </div>
                    
                    <br />
                        {/* <input type="text" name={department} onChange={(e) => setDepartment(e.target.value)} /> */}
                        <CustomAutocomplete
                            id="combo-box-demo"
                            options={departments}
                            sx={{ width: 300, backgroundColor: 'white', fontFamily: 'RotundaLight' }}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                setDepartment(newValue ? newValue.code : '');}}
                            renderInput={(params) => <CustomTextField {...params} label="Department" variant="outlined" />}
                            />
                    <br />
                    {/* <label>
                        Course Number:
                        <input type="text" name={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} />
                    </label> */}
                    <CustomTextField
                        variant="outlined"
                        name={section}
                        onChange={(e) => setCourseNumber(e.target.value)}
                        placeholder="Course Number (eg. L52)"
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
                    <br />
                    <input type="submit" className="button text-gray-800 p-5 w-7/12 bg-gray-300 hover:bg-gray-400"  value="Submit" />
                </form>

            </div>
        </div>
            
            
        </>
    )
}

interface Department {
    code: string;
    name: string;
}

const departments:  Department[] = [
    {'code': 'L90', 'name': 'AFRICAN AND AFRICAN-AMERICAN STUDIES'},
{'code': 'L98', 'name': 'AMERICAN CULTURE STUDIES'},
{'code': 'L48', 'name': 'ANTHROPOLOGY'},
{'code': 'L92', 'name': 'APPLIED LINGUISTICS'},
{'code': 'L49', 'name': 'ARABIC'},
{'code': 'L52', 'name': 'ARCHAEOLOGY'},
{'code': 'L01', 'name': 'ART HISTORY AND ARCHAEOLOGY'},
{'code': 'L46', 'name': 'ASIAN AMERICAN STUDIES'},
{'code': 'L86', 'name': 'BIOLOGICAL & PHYSICAL SCIENCES FOR PBPM'},
{'code': 'L41', 'name': 'BIOLOGY AND BIOMEDICAL SCIENCES'},
{'code': 'L56', 'name': 'CENTER FOR THE HUMANITIES'},
{'code': 'L07', 'name': 'CHEMISTRY'},
{'code': 'L66', 'name': "CHILDREN'S STUDIES"},
{'code': 'L04', 'name': 'CHINESE'},
{'code': 'L08', 'name': 'CLASSICS'},
{'code': 'L59', 'name': 'COLLEGE WRITING PROGRAM'},
{'code': 'L16', 'name': 'COMPARATIVE LITERATURE'},
{'code': 'L29', 'name': 'DANCE'},
{'code': 'L15', 'name': 'DRAMA'},
{'code': 'L19', 'name': 'EARTH, ENVIRONMENTAL & PLANETARY SCIENCE'},
{'code': 'L81', 'name': 'EAST ASIAN LANGUAGES & CULTURES'},
{'code': 'L11', 'name': 'ECONOMICS'},
{'code': 'L12', 'name': 'EDUCATION'},
{'code': 'L14', 'name': 'ENGLISH LITERATURE'},
{'code': 'L82', 'name': 'ENVIRONMENTAL STUDIES'},
{'code': 'L53', 'name': 'FILM AND MEDIA STUDIES'},
{'code': 'L61', 'name': 'FIRST-YEAR PROGRAMS'},
{'code': 'L34', 'name': 'FRENCH'},
{'code': 'L43', 'name': 'GENERAL STUDIES'},
{'code': 'L21', 'name': 'GERMANIC LANGUAGES AND LITERATURES'},
{'code': 'L97', 'name': 'GLOBAL STUDIES'},
{'code': 'L09', 'name': 'GREEK'},
{'code': 'L74', 'name': 'HEBREW'},
{'code': 'L73', 'name': 'HINDI'},
{'code': 'L22', 'name': 'HISTORY'},
{'code': 'L93', 'name': 'INTERDISCIPLINARY PROJECT IN THE HUMANITIES'},
{'code': 'L36', 'name': 'ITALIAN'},
{'code': 'L05', 'name': 'JAPANESE'},
{'code': 'L75', 'name': 'JEWISH, ISLAMIC AND MIDDLE EAST STUDIES'},
{'code': 'L51', 'name': 'KOREAN'},
{'code': 'L10', 'name': 'LATIN'},
{'code': 'L45', 'name': 'LATIN AMERICAN STUDIES'},
{'code': 'L84', 'name': 'LEGAL STUDIES'},
{'code': 'L44', 'name': 'LINGUISTICS'},
{'code': 'L24', 'name': 'MATHEMATICS AND STATISTICS'},
{'code': 'L85', 'name': 'MEDICAL HUMANITIES'},
{'code': 'L63', 'name': 'MOVEMENT SCIENCE'},
{'code': 'L27', 'name': 'MUSIC'},
{'code': 'L88', 'name': 'NURSING SCIENCE'},
{'code': 'L99', 'name': 'OVERSEAS PROGRAMS'},
{'code': 'L30', 'name': 'PHILOSOPHY'},
{'code': 'L64', 'name': 'PHILOSOPHY-NEUROSCIENCE-PSYCHOLOGY'},
{'code': 'L28', 'name': 'PHYSICAL EDUCATION'},
{'code': 'L31', 'name': 'PHYSICS'},
{'code': 'L32', 'name': 'POLITICAL SCIENCE'},
{'code': 'L37', 'name': 'PORTUGUESE'},
{'code': 'L62', 'name': 'PRAXIS'},
{'code': 'L33', 'name': 'PSYCHOLOGICAL & BRAIN SCIENCES'},
{'code': 'L57', 'name': 'RELIGION AND POLITICS'},
{'code': 'L23', 'name': 'RELIGIOUS STUDIES'},
{'code': 'L39', 'name': 'RUSSIAN'},
{'code': 'L40', 'name': 'SOCIOLOGY'},
{'code': 'L38', 'name': 'SPANISH'},
{'code': 'L89', 'name': 'SPEECH AND HEARING'},
{'code': 'LGS', 'name': 'THE GRADUATE SCHOOL'},
{'code': 'L18', 'name': 'URBAN STUDIES'},
{'code': 'L77', 'name': 'WOMEN, GENDER, AND SEXUALITY STUDIES'},
{'code': 'L13', 'name': 'WRITING'}
]

export default Home