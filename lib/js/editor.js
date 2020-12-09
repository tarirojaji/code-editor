// Retrieve Elements
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

//Setup Ace
let codeEditor = ace.edit('editorCode');
let defaultCode = 'console.log("Hello World!")';
let consoleMessages = [];

let editorLib = {
    clearConsoleScreen() {
        consoleMessages.length = 0;

        // Remove all elements in log list
        while(consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },
    printToConsole() {
        consoleMessages.forEach(log =>{
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class; //ex... log log--string 
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);
        })
    },
    init() {
        // Configure Ace

        // Theme
        codeEditor.setTheme('ace/theme/dreamweaver');

        // Set Language
        codeEditor.session.setMode('ace/mode/javascript');

        // Set Options
        codeEditor.setOptions({
            // fontFamily: 'Inconsolata',
            // fontSize: '12pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }

}

// Events
executeCodeBtn.addEventListener('click', () => {
    // Clear console messages 
    editorLib.clearConsoleScreen();
    
    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    try {
        new Function(userCode)();
    } catch (error) {
        console.error(error)
    }

    // Print to console
    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {
    // Reset ace editor
    codeEditor.setValue(defaultCode);

    // Clear console messages 
    editorLib.clearConsoleScreen();
})

editorLib.init();