# EmpowerJS
Open source project for building web applications using pure JS.

NPM modules, Angular, React, many other project dependencies give us advantages like:

- Faster development.
- Standards for developers to follow (MVC/Flux/Injection/Unit testing/etc).
- Built-in components with some extensibility/configurability.
- Some cross platform support.

but they give us some disadvantages as well:

- Inherited bugs.
- Security issues.
- Performance issues.
- Breaking changes.
- Dependency hierarchies.
- Required transpilers.
- Required servers to develop/deploy web apps.
- Compatibility issues.
- Unused code (we don't use all their code in our apps).
- Hard debugging due to callstack or messaging systems.
- Licenses.

For all those disadvantages I wanted to build a web app from scratch just taking advantage of latest ES6 features and some design patterns
like MVC, Component based design, KISS so that I can take full control of the application code getting an even faster frontend development, that's why EmpowerJS born.
The intention of EmpowerJS as its name says is to take advantage of native JS power as much as possible, I wouldn't say EmpowerJS is a framework, I would say it is 'guide' or 'template' of a project that can be extended following some design patterns.
One of the guidelines that should be followed using EmpowerJS is to avoid including any npm dependency, we know there are awesome built UI components that we would like to include in our application but those awesome UI components are implicitly complex so using them we would be breaking the KISS principle.

## What does EmpowerJS provide?
- One 'Hello Word' App.
- One demo app 'Inventory'.
  - Lightweight app built using [LigatureSymbols]: https://github.com/kudakurage/LigatureSymbols
  - Configured grunt build to generate a single .html, .js, .css for the app.
- Few utility code to manipulate HTML/Dom elements easily.
- Few reusable base components (spinner, popup, etc).
- Very simple and efficient localization system.
- Development patterns to follow.
- Performance:
  - When a component is refreshed that action will only refresh its component hierarchy.
  - No watchers, bindings, transpiling, or any other extra processing involved, just your code.
  - Keep the html/DOM structure to the minimal required (do not create heavy html hierarchy).
- Fast development:
  - No installation needed since no server needed.
  - Frontend and mock API/backend are pure JS so we can just drag a drop the `inventory/build/output/index.html` to the browser and that's it.
  - Mock API/backend has to be adjusted to the API that the application will use (or the API has to be adjusted to 'match' the mock API), the application will use Mock as one environment.
- Multiplatform:
  - Runs on Chrome on any platform and Safari on Mac/iOS.

## How to start?
- Clone the repo.
- Drag and drop any `inventory/build/output/index.html` to the browser.
- See how it works, test and develop
- Any time a change is made to under the `inventory/app` folder you'll need to run `npm run build` in the `inventory/build` folder to get that change updated in `inventory/build/output/index.html`.

[TODO]: https://github.com/leorojas86/EmpowerJS/blob/master/TODO.md
