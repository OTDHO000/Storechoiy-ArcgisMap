import React, {useState} from 'react';
import './City.css';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(2),    
//     minWidth: 120,
//     width: '70vw'
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function City(props) {
  // const classes = useStyles();

  const  {
    industry,setIndustry,
    type,setType,
    district,setDistrict,
    sub_district,setSubDistrict,
    rent_min,setRentMin,
    rent_max,setRentMax
  } =props.paramValue


  const [blocks, setBlocks] =useState([{id:1,name:'Tsuen Wan'},{id:2,name:'Lei Muk Shue'},{id:3,name:'Ting Kau'},{id:3,name:'Sham Tseng'},{id:4,name:'Ma Wan'}])
  
  // const [kwaitsing, setkwaitsing] = useState([{id:1,name:'Kwai Chung'},{id:2,name:'Tsing Yi'}])
  const [tsuenwan, settsuenwan] = useState([{id:1,name:'Tsuen Wan'},{id:2,name:'Lei Muk Shue'},{id:3,name:'Ting Kau'},{id:3,name:'Sham Tseng'},{id:4,name:'Ma Wan'}])
  const [sub_districtArr] = useState([{id:1,name:'Tsing Yi'},{id:2,name:'Kwai Chung'}])
  const [industrylist] =useState(['restaurant'])
  const [typelist] = useState([{id:"RL",name:"General Restaurant"},{id:"RR",name:"Light Refreshment Restaurant"}])
  const [districtArr] = useState([{id:1,name:'Kwai Tsing District'},{id:2,name:'Tsuen Wan District'}])  

  const handleDistrict = (event) =>{
    if(event.target.value === 'Kwai Tsing District'){
      setBlocks(sub_districtArr) 
    }
    if(event.target.value === 'Tsuen Wan District'){
      setBlocks(tsuenwan) 
    }
    setDistrict(event.target.value) 
  }
  
  // handle the second level select for industrylist and type, for example, if the user select restaurant, then the second level select will show the type of restaurant

  const handleChange_industry = (event) => {
    props.onBlockChange(event.target.value);
    if(event.target.value === 1){
      setBlocks(typelist) 
    }
  }

// The following lines are commends that use to interface the backend results to frontend

  const start = 400;
  const end = 50000;
  const step = 100;

  const generateArray = () => {
    const array = [];
    for (let i = start; i <= end; i+=step) {
      array.push(i);
    }
    return array;
  };

  const orderedArray = generateArray();


  return (
    <div >
      {/* <FormControl className={classes.formControl}> */}
      <div className='queryform'>  
        <ul>
        <li>
          <label id="industry-label">Industry: </label><br/>
          <select
              labelId="industry-label"
              id="industry-select"
              value={industry}
              style={{width: '120px'}}
              onChange={(event)=>setIndustry(event.target.value)}
            >
              <option value={'restaurant'}>Resturant</option> 
          </select>
        </li>
        <li>
          <label id="demo-select-label">Type: </label><br/>
            <select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={(event)=>setType(event.target.value)}
                style={{width: '120px'}}
              >
                {typelist.map(item=>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )}
            </select>
          </li>
        <li>
          <label id="demo-simple-select-label">District: </label><br/>
          <select
              labelId="demo-simple-select-label"
              id="district-select"
              value={district}
              onChange={handleDistrict}
              style={{width: '120px'}}
          >             
               {districtArr && districtArr.map(item =>
                  <option key={item.id} value={item.name}>{item.name}</option>
              )} 
          </select>
        </li>
        <li>
          <label id="second-level">Sub_District: </label><br/>  
          <select
              labelId="second-level"
              id="second-level-select"
              value={sub_district}
              onChange={(event)=>setSubDistrict(event.target.value)}
              defaultValue="Sub-District"
              style={{width: '120px'}}
            >
              {blocks && blocks.map(item =>
                  <option key={item.id} value={item.name}>{item.name}</option>
              )}
          </select>
        </li>
        <li>
            <label id="budget">Rent_min </label> 
            <label id="budget2">Rent_max </label> 
            <br/>
            <div className='selectors' >
              <select id="Rent_min" value={rent_min} onChange={(event)=>setRentMin(event.target.value)}>
                {orderedArray.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select>           
              <select id="Rent_max" value={rent_max} onChange={(event)=>setRentMax(event.target.value)} >
                {orderedArray.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select> 
              HKD
            </div>
             
        </li>
        </ul>
      </div>  
      {/* </FormControl> */}
    </div>
  );
}
