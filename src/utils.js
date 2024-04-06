import axios from 'axios';
function convertDateToAPIDate(date) {
    const yyyy = date.getYear();
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    return [ yyyy,
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
            ].join('-');
}

export default function callAPIs(embeddedSearchFields, setAllPlaces, setSchedule){

    const requestObject = {
        industry : embeddedSearchFields.industry,
        type : embeddedSearchFields.type,
        district : embeddedSearchFields.district,
        sub_district : embeddedSearchFields.sub_district,
        rent_min : embeddedSearchFields.rent_min,
        rent_max : embeddedSearchFields.rent_max,
       
    }
    console.log("requestObject:-----------",requestObject)
    axios.post('http://localhost:5000/SCapi/search/queryinfo', requestObject).then( (response) => { //http://localhost:5000/SCapi   8.134.162.73:80/SCapi
        const newAllPlaces = [];
        if(response.data.status==="success"){
            response.data.places.forEach(element => {
                newAllPlaces.push(element);
            })
            setAllPlaces(newAllPlaces);
            console.log("setallPlace-------")
        }else{
            window.confirm('No result for these criteria')
        }
        // const newSchedule = []
        // // response.data.schedule.forEach(element => {
        // //     newSchedule.push(element);
        // // })
        // // setSchedule(newSchedule);
    }).catch( (error) =>  {
        window.confirm('No result for these criteria')
        console.log(error);
    }).then(()=>{});
}