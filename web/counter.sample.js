;(() => {
    // PLEASE change config info:
    const apiServer = 'http://127.0.0.1:3000/counter/v1/sites/zjcweb'
    const pvSelector = '#counter_site_pv_value'
    const containerSelector = '#counter_site_pv_container'
    // STOP CHANGE HERE

    window.addEventListener('DOMContentLoaded', () => {
        fetch(apiServer, {
            method: 'PUT'
        })
        .then((res) => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            if (data.status == 'OK') {
                let e = document.querySelector(pvSelector)
                if (e) {
                    e.innerHTML = data.pv
                }
            } else {
                let e = document.querySelector(containerSelector)
                if (e) {
                    e.style.display = 'none'
                }
            }
        });
    })
})()
