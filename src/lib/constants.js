const apps = [
        {
        app_title: "Typing Bliss",
        app_description: "From casual to pro, all your typing needs in one app.",
        app_link: process.env.REACT_APP_TYPING_BLISS_URL,
        app_color: "rgb(255, 255, 0)"
        },
        {
        app_title: "Tracking Budget",
        app_description: "Record, visualize and plan you expenditures.",
        app_link: process.env.REACT_APP_TRACKING_BUDGET_URL,
        app_color: "rgb(255, 0, 255)"
        },
        {
        app_title: "Dashboard",
        app_description: "One place to track all your progress.",
        app_link: process.env.REACT_APP_DASHBOARD_URL,
        app_color: "rgb(0, 255, 255)"
        }
    ];

const themes = [{
        name: "green-theme",
        background: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXRidmE0YXV5cWZsaGdkYzJpbWt5OHMyczhvaTF4YnU4eDB4NTY5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BRLez2vAFQrgf0Thqx/giphy.gif"
    }, { 
        name: "yellow-theme",
        background: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bTg4NHp6bHZodHc3bXRqZTYxMXk3ZDU4ZXc5bnVhYW1zNGpmc2gwcSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/X6ciwNt1zS8rOI6c19/giphy.gif"
    }];

export { apps, themes };