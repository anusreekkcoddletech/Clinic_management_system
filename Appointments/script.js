
document.addEventListener("DOMContentLoaded", function () {
    getAppointmentsData()
})
function getAppointmentsData() {
    console.log("success")

    const url = "http://localhost:3001/patients/viewAppointments"

    fetch(url, {
        method: "GET",
        dataType: "json",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsImlhdCI6MTcwMjk2OTk5NywiZXhwIjoxNzAzMDU2Mzk3fQ.FAuceznMoZdDVuBnoT2mJv6_BzF9Ve7cT6kz7CDz2Ko`
        },
    }).then((response) => {
        response.json().then((data) => {
            appointmentsTable(data.data)
        })
    })
}
function appointmentsTable(appointments) {    
    let html= '<table>'
    for( let i =0 ; i<appointments.length ; i++){
        html +='<tr>'
        html +='<td>'+appointments[i].date+'</td>'
        html +='<td>'+appointments[i].status+'</td>'
        html +='<td>'+appointments[i].patients_id+'</td>'
        html +='<td>'+appointments[i].employees_id+'</td>'
        html +='</tr>'
    }
    html +='</table>'
    document.querySelector("#tableBody").innerHTML=html
}
