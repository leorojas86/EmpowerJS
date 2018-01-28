# EmpowerJS
Open source project for building javascript applications in pure JS.

NPM modules, Angular, React, many other project dependencies give us advantages like:

- Faster development.
- Standard for developers to follow (MVC/Flux/Injection/Unit testing/etc).
- Built-in components with some extensibility/configurability.
- Some cross platform support.

but they give us some some disadvantages as well:

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
- Few utility code to manipulate HTML/Dom elements easily.
- Few reusable base components (spinner, popup, etc).
- Very simple and efficient localization system.
- Development patterns to follow.
- Performance:
  - When a component is refreshed that action will only refresh its component hierarchy.
  - No watchers, bindings, transpiling, or any other extra processing involved, just your code.
- Fast development:
  - No installation needed since no server needed.
  - Frontend and mock API/backend are pure JS so we can just drag a drop the index.html to the browser and that's it.
  - Mock API/backend has to be adjusted to the API that the application will use (or the API has to be adjusted to 'match' the mock API), the application will use Mock as one environment.

## How to start?
- Clone the repo.
- Drag and drop any index.html to the browser.
- See how it works, test and develop.

[TODO]: https://github.com/leorojas86/EmpowerJS/blob/master/TODO.md
