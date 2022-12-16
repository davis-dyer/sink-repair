//storing the external state in application state
const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

//accessing the port on the internet where the data we need is
const API = "http://localhost:8088"
//creating a fetch request function that 
    //Step 1 - obtains the API data
    //Step 2 - parses the data into json
    //Step 3 - converts the json object into a JS object
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

//Creating a fetch request that goes through the 3 step process of parsing json data into JS.
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}


//exporting a get function containing an array copy of the application state
export const getRequests = () => {
    return [...applicationState.requests]
}

//exporting a get function containing an array copy of the plumbers application state
export const getPlumberRequests = () => {
    return [...applicationState.plumbers]
}

//POST method... Tells the API that we want to create something new -- REQUEST
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


//DELETE method... tells API that we want to delete data
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

//Creating a fetch request that goes through the 3 step process of parsing json data into JS.
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (complete) => {
                applicationState.completions = complete
            }
        )
}

//Create a function "saveCompletion()"- This will  perform the POST request to save the completion object to the API
export const saveCompletion = (completion) => {
    const fetchCompletion = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }

    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/completions`, fetchCompletion)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
        )
}