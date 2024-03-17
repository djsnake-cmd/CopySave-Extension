function createCards(index){
    const container = document.getElementById('container');
    const div = document.createElement('div');
    div.className = "container";
    div.innerHTML=`
        <div id="area-${index}-div" class="card">
            <textarea name="" id="textarea-${index}" class="textArea" WRAP="off"></textarea>
            <div class="btn-container">
            <button id="btn-copy-${index}" class="btn">COPY</button>
            <button id="btn-save-${index}" class="btn">SAVE</button>
            <button id ="btn-delete-${index}" class="btn">DELETE</button>
            </>
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

//Jobbar här atm
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
    createCards(index);
}

