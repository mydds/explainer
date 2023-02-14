
// Read data from Explain node and set options for ExplainMenu dropdown
firebase.database().ref('Explain').on('value', function(snapshot) {
  let options = '<option value="">Explain:</option>';
  snapshot.forEach(function(childSnapshot) {
    options += `<option value="${childSnapshot.val().name}">${childSnapshot.val().name}</option>`;
  });
    document.getElementById('ExplainMenu').innerHTML = options;
});

// Read data from LikeIm node and set options for LikeImMenu dropdown
firebase.database().ref('LikeIm').on('value', function(snapshot) {
  let options = '<option value="">Like Im:</option>';
  snapshot.forEach(function(childSnapshot) {
    options += `<option value="${childSnapshot.val().name}">${childSnapshot.val().name}</option>`;
  });
  document.getElementById('LikeImMenu').innerHTML = options;
    
    document.getElementById("DynamicResponse").innerHTML = "Select from the dropdowns above";
});


// Listen for onchange event of ExplainMenu dropdown and update LikeImMenu options
document.getElementById("ExplainMenu").onchange = function() {
    let selectedExplain = this.value;
    let options = '<option value="">Like Im:</option>';
    if (!selectedExplain) {
        // If ExplainMenu selection is empty, show all options in LikeImMenu
        firebase.database().ref('LikeIm').on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                options += `<option value="${childSnapshot.val().name}">${childSnapshot.val().name}</option>`;
            });
            document.getElementById('LikeImMenu').innerHTML = options;
        });
    } else {
        // If ExplainMenu selection is not empty, show only options in LikeImMenu that have a defined associated value under the selected Explain option
        firebase.database().ref(`DynamicResponse/${selectedExplain}`).on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                options += `<option value="${childSnapshot.key}">${childSnapshot.key}</option>`;
            });
            document.getElementById('LikeImMenu').innerHTML = options;
        });
    }
};


// Listen for onchange event of LikeImMenu dropdown and update DynamicResponse
document.getElementById("LikeImMenu").onchange = function() {
  let selectedLikeIm = this.value;
  let selectedExplain = document.getElementById("ExplainMenu").value;
  if (!selectedExplain || !selectedLikeIm) {
    document.getElementById("DynamicResponse").innerHTML = "Select from the dropdowns above";
    return;
  }
  if(selectedExplain){
    firebase.database().ref(`DynamicResponse/${selectedExplain}/${selectedLikeIm}`).on('value', function(snapshot) {
      if (snapshot.exists()) {
  let response = snapshot.val().DynamicResponse;
  document.getElementById("DynamicResponse").innerHTML = response;
} else {
  document.getElementById("DynamicResponse").innerHTML = "No match found. Try another combination";
}

    });
  }
};







                                      
                                      

//For adding in-menu links to other menu selections
/*document.getElementById("myLink").addEventListener("click", function(){
    // code to change the value of the dropdown menus
    document.getElementById("ExplainMenu").value = "Ethereum";
document.getElementById("LikeImMenu").value = "average person";
document.getElementById("ExplainMenu").onchange();
document.getElementById("LikeImMenu").onchange();

});
*/

/*
window.onload = function() {
  // Change default text of ExplainMenu dropdown
  document.getElementById("ExplainMenu").innerHTML = "<option selected>Explain what...</option>";

  // Change default text of LikeImMenu dropdown
  document.getElementById("LikeImMenu").innerHTML = "<option selected>Like I'm what...</option>";
}
*/

/*
const infoIcon = document.getElementById("info-icon");
const textbox = document.getElementById("textbox");

infoIcon.addEventListener("mouseover", function() {
    textbox.classList.remove("hidden");
});

infoIcon.addEventListener("mouseout", function() {
    textbox.classList.add("hidden");
});
*/