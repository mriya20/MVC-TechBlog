const loginFormHandle = async (event) => {
    // The preventDefault() method stops the default action of a selected element from happening by a user. This method does not accept any parameter and works in two ways: 
    // It prevents a link from following the URL so that the browser can't go another page. 
    // It prevents a submit button from submitting a form.  
    event.preventDefault();
    console.log("loginFormHandle");
    // The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string. 
    // To return a new string with whitespace trimmed from just one end, use trimStart() or trimEnd() 
    const comment_body = document.getElementById("comment-body").value.trim();
    const url = location.href.split("/")
    const post_id = url[url.length - 1]

    if (comment_body && post_id) {
        // Fetch sends the Request and returns a promise, which is resolved to the Response object when the request completes.
        // If the request fails, the promise is rejected. 
        // To get the data received in the response,
        // you need to wait for this promise to resolve into the Response object
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ comment_body, post_id }),
            headers: { "Content-Type": "application/json" },
        });
        const results = response.json()
        console.log(results);

        if (response.ok) {
            console.log("TESTING");
            document.location.replace('/dashboard');
        } else {

            alert("Failed to log in.");
        }
    }
};


document.getElementById('comment-button').addEventListener('click', loginFormHandle);