
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
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsImlhdCI6MTcwMzIyNDI1NCwiZXhwIjoxNzAzMzEwNjU0fQ.53fKQ-iKH75DCgpm6-nHYgU0Qh7FBKIGGyu9QtX9MAM`
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
        html += '<td>' + appointments[i].patients_id+ '</td>'
        html += '<td>' + appointments[i].employees_id + '</td>'
        html += '</tr>'
    }
    html += '</table>'
    document.querySelector("#tableBody").innerHTML = html
}
