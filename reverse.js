// Read data from Explain node and set options for ExplainMenu dropdown
firebase.database().ref('Explain').on('value', function(snapshot) {
  console.log(snapshot);
  let options = '<option value="">Select ▼</option>';
  snapshot.forEach(function(childSnapshot) {
    options += `<option value="${childSnapshot.val().name}">${childSnapshot.val().name}</option>`;
  });
  document.getElementById('ExplainMenu').innerHTML = options;
});


// Read data from LikeIm node and set options for LikeImMenu dropdown
firebase.database().ref('LikeIm').on('value', function(snapshot) {
  let options = '<option value="">Select ▼</option>';
  snapshot.forEach(function(childSnapshot) {
    options += `<option value="${childSnapshot.val().name}">${childSnapshot.val().name}</option>`;
  });
  document.getElementById('LikeImMenu').innerHTML = options;
});

document.getElementById('DynamicResponse').innerHTML = "Select from the dropdowns above";

// Listen for onchange event of LikeImMenu dropdown and update ExplainMenu options
document.getElementById('LikeImMenu').onchange = function() {
    let selectedLikeIm = this.value;
    let options = '<option value="">Select ▼</option>';
    if (!selectedLikeIm) {
        // If LikeImMenu selection is empty, show all options in ExplainMenu
        firebase.database().ref('Explain').on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                options += `<option value="${childSnapshot.val().name}">${childSnapshot.val().name}</option>`;
            });
            document.getElementById('ExplainMenu').innerHTML = options;
        });
    } else {
        // If LikeImMenu selection is not empty, show only options in ExplainMenu that have a defined associated value under the selected LikeIm option
        firebase.database().ref('DynamicResponse').on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if(childSnapshot.hasChild(selectedLikeIm)){
                    options += `<option value="${childSnapshot.key}">${childSnapshot.key}</option>`;
                }
            });
            document.getElementById('ExplainMenu').innerHTML = options;
        });
    }
};

// Listen for onchange event of ExplainMenu dropdown and update DynamicResponse
document.getElementById('ExplainMenu').onchange = function() {
   let selectedExplain = this.value;
let selectedLikeIm = document.getElementById("LikeImMenu").value;
if (!selectedExplain || !selectedLikeIm) {
  document.getElementById('DynamicResponse').innerHTML = "Select from the dropdowns above";
  return;
}
firebase.database().ref(`DynamicResponse/${selectedExplain}/${selectedLikeIm}`).on('value', function(snapshot) {
  if (snapshot.exists()) {
    let response = snapshot.val().DynamicResponse;
    document.getElementById('DynamicResponse').innerHTML = response;
  } else {
    document.getElementById('DynamicResponse').innerHTML = "No match found. Try another combination";
  }
});
}


