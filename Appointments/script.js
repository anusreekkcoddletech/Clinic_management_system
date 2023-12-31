
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
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsImlhdCI6MTcwMzU2Njc1MCwiZXhwIjoxNzAzNjUzMTUwfQ.m1lfO1c__-YOeFXNP0ojtljsqvVJJOdK_VhJScpZ-ec`
        },
    }).then((response) => {
        response.json().then((data) => {
            appointmentsTable(data.data)
        })
    })
}
function appointmentsTable(appointments) {
    let html = '<table>'
    for (let i = 0; i < appointments.length; i++) {
        html += '<tr>',
            html += '<td>' + appointments[i].id + '</td>'

        html += '<td>' + appointments[i].date + '</td>'
        html += '<td>' + appointments[i].status2 + '</td>'
        html += '<td>' + appointments[i].patient_name+ '</td>'
        html += '<td>' + appointments[i].doctor_name + '</td>'
        html += '</tr>'
    }
    html += '</table>'
    document.querySelector("#tableBody").innerHTML = html
}
