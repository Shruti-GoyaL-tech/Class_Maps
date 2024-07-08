let clgname = ['IGDTUW'] ;


// Adding Colleges In search option
function addsearchbar() {
    let search = document.body.querySelector(".selectorinner");
    let searchHtml = `<select name="college_name" id="clgSelector">`;
    searchHtml += `<option value="">Select University/College</option>`;
    for (const iterator of clgname) {
        searchHtml += `<option value="${iterator}">${iterator}</option>`;
    }
    searchHtml += `</select>`;
    search.innerHTML = searchHtml;
    document.body.querySelector(".results").innerHTML = ``;
    bindSelectEvent();
}

addsearchbar();

//Initailizing structure to store whole data
let clgData = new Array(clgname.length);
clgData[0] = new Array(5);
for(let i=0; i<5; i++){
    clgData[0][i] = new Array(8);
}

// Adding Demo Data <-- Sample Initial Data -->
clgData[0][0][0]=[213,102,212,214];
clgData[0][0][1]=[213,102,212];
clgData[0][0][2]=[213,102];
clgData[0][0][3]=[213,102,212,214];
clgData[0][0][4]=[213,102,212,214];
clgData[0][0][5]=[213,103,211,214];
clgData[0][0][6]=[212,102,212,214];
clgData[0][0][7]=[213,101,212,214];

clgData[0][1][0]=[213,102,214];
clgData[0][1][1]=[213,102,212,214];
clgData[0][1][2]=[213,102,212,214];
clgData[0][1][3]=[213,102,212,214];
clgData[0][1][4]=[213,102,312,114];
clgData[0][1][5]=[213,102,212,214];
clgData[0][1][6]=[213,122,212,214];
clgData[0][1][7]=[213,132,214];

clgData[0][2][0]=[213,102,212,214];
clgData[0][2][1]=[213,102,312,114];
clgData[0][2][2]=[212,102,212,214];
clgData[0][2][3]=[213,101,212,214];
clgData[0][2][4]=[213,102,212,214];
clgData[0][2][5]=[213,102,212,214];
clgData[0][2][6]=[213,102,212,214];
clgData[0][2][7]=[213,102,312,114];

clgData[0][3][0]=[313,122,212,214];
clgData[0][3][1]=[213,132,212,214];
clgData[0][3][2]=[213,102,212,214];
clgData[0][3][3]=[213,102,212,214];
clgData[0][3][4]=[213,102,222,214];
clgData[0][3][5]=[213];
clgData[0][3][6]=[213,122,212,214];
clgData[0][3][7]=[213,132,212,214];

clgData[0][4][0]=[213,102,212,214];
clgData[0][4][1]=[213,102,312,114];
clgData[0][4][2]=[213,102,212,214];
clgData[0][4][3]=[214];
clgData[0][4][4]=[213,102,212,214];
clgData[0][4][5]=[213,102,312,114];
clgData[0][4][6]=[213,102,212,214];
clgData[0][4][7]=[213,102,212,214];



// Listener when we change choices in select bar in search
function bindSelectEvent() {
    const selectElement = document.getElementById("clgSelector");
    selectElement.addEventListener("change", function() {
        const selectedValue = selectElement.value;
        if (selectedValue != "") {
            const currentHour = new Date().getHours();
            const today = new Date().getDay();
            let search = document.body.querySelector(".results");
            if (today == 0 || today == 6 || currentHour < 9 || currentHour > 16) {
                search.innerHTML = `Please note that the ${selectedValue} is currently closed.`;
            } else {
                    let resultdata = `<h3>Vacant room no. are: </h3>`;
                        let clgIndex = clgname.indexOf(selectedValue);
                        for (const iterator of clgData[clgIndex][today - 1][currentHour - 9]) {
                            if (iterator != "") resultdata += `<h2>${iterator}</h2>`;
                        }
                        search.innerHTML = resultdata;
            }
        } else {
            document.body.querySelector(".results").innerHTML = ``;
        }
    });
}


  // Listener activated when a new college data is created
  const collegeInput = document.getElementById("college-name");
  const submitButton = document.getElementById("submit-college");
  const resultDiv = document.getElementById("result");
  
  submitButton.addEventListener("click", () => {
    let collegeName = collegeInput.value;
    
    if (clgname.includes(collegeName)) {
        resultDiv.innerHTML=`This data already exists`;
      } else {
        resultDiv.innerHTML=``;
        clgname.push(collegeName);
        let nextClg = new Array(5);
        for(let i=0; i<5; i++){
            nextClg[i] = new Array(8);
            for(let j=0; j<8; j++){
                nextClg[i][j]=new Array(0);
            }
        }
        clgData.push(nextClg);
        
      }      
    addsearchbar();
  });
  
    // Listener activated when created college data is submitted
    const form = document.getElementById("input-form");
    const hourInput = document.getElementById("hour");
    const dayInput = document.getElementById("day");
    const roomNumbersInput = document.getElementById("room-numbers");
        
    form.addEventListener("submit", (e) => {
      collegeName = collegeInput.value;
      e.preventDefault();
      const hour = hourInput.value;
      const day = dayInput.value;
      const roomNumbers = roomNumbersInput.value.split(",").map((room) => parseInt(room.trim()));      

      const submission = document.getElementById("submission");
      if (!clgname.includes(collegeName)) {
        submission.innerHTML=`Firstly submit Institute ${collegeName}`;
      }
      else{
          console.log(`Data entered for ${collegeName}`);
          submission.innerHTML=``;
          const index = clgname.indexOf(collegeName);
          if (clgData[index][day-1][hour-9] === undefined) {
              clgData[index][day-1][hour-9]=new Array(0);
              clgData[index][day-1][hour-9].push(...roomNumbers);
          }
          else{
                for (const iterator of roomNumbers){
                    if(!clgData[index][day-1][hour-9].includes(iterator)){
                        clgData[index][day-1][hour-9].push(iterator);
                    }
                }
          }
      }
      addsearchbar();
    });

    // Hamburger in Navigation Bar
    document.getElementById('hamburger').addEventListener('click', function() {
        document.getElementById('navbar').classList.toggle('active');
      });
      
