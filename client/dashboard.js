const API_URL = 'http://localhost:3000/';

let issues;

$('document').ready(() => {
    $.ajax({
        url: API_URL + 'issue/',
        method: 'GET',
        success: (result) => {
            issues = result;
            for(let i = 0; i < result.length; i++) {
                $('#table').prepend(`
                <tr class="${result[i].resolved ? 'table-success' : 'table-danger'}">
                    <th scope="row">${i+1}</th>
                    <td>${result[i].title}</td>
                    <td>${result[i].created_at}</td>
                    <td>${result[i].resolved ? 'Yes': 'No'}</td>
                    <td>${result[i].resolved_at ? result[i].resolved_at : '--'}</td>
                    <td><button id="${result[i]._id}" class="btn btn-secondary">Resolve</button></td>
                    <td><button data-id="${result[i]._id}" class="btn btn-danger">Delete</button></td>
                </tr>
                `)
            }
        },
        error: (err) => {
            console.log(err);
        }
    })
})

$('#addIssue').click(() => {
    let obj = {
        title: $('#issueTitle').val()
    };
    if($('#issueTitle').val() == '') {
        alert('Please fill issue title')
        return;
    }
    $.ajax({
        url: API_URL + 'issue/',
        method: 'POST',
        data: obj,
        success: (result) => {
            issues.push(result);
            $('#issueTitle').val('');
            $('#table').prepend(`
                <tr class="${result.resolved ? 'table-success' : 'table-danger'}">
                    <th scope="row">${issues.length}</th>
                    <td>${result.title}</td>
                    <td>${result.created_at}</td>
                    <td>${result.resolved ? 'Yes': 'No'}</td>
                    <td>${result.resolved_at ? result.resolved_at : '--'}</td>
                    <td><button id="${result._id}" class="btn btn-secondary">Resolve</button></td>
                    <td><button data-id="${result._id}" class="btn btn-danger">Delete</button></td>
                </tr>
                `)
        },
        error: (err) => {
            console.log(err);
        }
    })
})

$(document).on('click', '.btn-secondary', (event) => {
    const issueId = event.target.id;

    let obj = {
        resolved: true
    };

    $.ajax({
        url: API_URL + 'issue/' + issueId,
        method: 'PUT',
        data: obj,
        success: (res) => {
            document.location.reload();
        },
        error: (err) => {
            console.log(err);
        }
    })
})

$(document).on('click', '.btn-danger', (event) => {
    const id = event.target.attributes[0].nodeValue;
    $.ajax({
        url: API_URL + 'issue/' + id,
        method: 'DELETE',
        success: (res) => {
            document.location.reload();
        },
        error: (err) => {
            console.log(err);
        }
    })
    
})