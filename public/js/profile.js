//update const with more appropriate naming
const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#job-title').value.trim();
    const description = document.querySelector('#job-desc').value.trim();
    const salary = document.querySelector('#job-salary').value.trim();
    
    if (name && salary && description) {
        const response = await fetch ('/api/jobs', {
            method: 'POST',
            body: JSON.stringify({name, needed_funding, description}),
            headers: {
                'Content-Type': 'applicatoin/json',
            }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create project');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/projects/${id}`, {
            method:'DELETE',
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to delete job');
    }
}
};

document
    .querySelector('.new-job-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.job-list')
    .addEventListener('click', delButtonHandler);