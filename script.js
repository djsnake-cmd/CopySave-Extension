function createCard(index){
    const container = document.getElementById('container');
    const div = document.createElement('div');
    div.className = "container";
    div.innerHTML=`
        <div id="area-${index}-div" class="card">
<!-- copy button - position relative -->
        <div class=copy-container-over-text>
                <svg id="btn-copy-${index}" class="copy-btn" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                </svg>
            </div>
            <textarea name="" id="textarea-${index}" class="textArea" WRAP="off"></textarea>
            <div class="btn-container">
<!-- save button -->
                <svg id="btn-save-${index}" class="save-btn" xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 16 15" fill="currentColor">
                    <path fill="#000" fill-rule="evenodd" d="M12.59 1a1 1 0 0 1 .7.3l1.42 1.4a1 1 0 0 1 .29.71V14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1ZM11.5 8h-7a1 1 0 0 0-1 1v4.5h9V9a1 1 0 0 0-1-1Zm.5-5.5H4v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3Zm-2 .75c.41 0 .75.34.75.75v1a.75.75 0 1 1-1.5 0V4c0-.41.34-.75.75-.75Z" />
                </svg>            
<!-- delete button -->
                <svg id="btn-delete-${index}" class="delete-btn" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 26 26">
                    <path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"></path>
                </svg>
            </div>
        </div>`;
    container.appendChild(div);

    document.getElementById(`btn-copy-${index}`).addEventListener('click',function(){
        copyToClipboard(index);
    })
    
    document.getElementById(`btn-save-${index}`).addEventListener('click', function(){
        saveText(index);
    })
    document.getElementById(`btn-delete-${index}`).addEventListener('click',function(){
        deleteText(index);
    })
}


function copyToClipboard(index) 
{
    var copyText = document.getElementById(`textarea-${index}`);
    copyText.select();
    console.log(copyText)
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}

function saveText(index) 
{
    var key = `savedText-${index}`;
    var text = document.getElementById(`textarea-${index}`).value;
    var data = {};
    data[`savedText-${index}`] = text;
    chrome.storage.local.set(data, function () { });

    document.getElementById(`textarea-${index}`).readOnly = true;

}

function deleteText(index) {
    var key = `savedText-${index}`;
    chrome.storage.local.remove(key, function () {});
    document.getElementById(`textarea-${index}`).value = '';
}

document.addEventListener('DOMContentLoaded', function () 
{
    for (let index = 0; index < 4; index++) {
        const key = `savedText-${index}`;
        chrome.storage.local.get(key, function(data) {
        document.getElementById(`textarea-${index}`).value = data[key] || '';
        })
    }
});

for(let index = 0; index<4; index++){
    createCard(index);
}