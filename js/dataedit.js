const firebaseConfig = {
    apiKey: "AIzaSyCqIqmoiKfLbHrJbrA1Le5NcYRRu-uQLII",
    authDomain: "apple-pie-430c3.firebaseapp.com",
    projectId: "apple-pie-430c3",
    storageBucket: "apple-pie-430c3.appspot.com",
    messagingSenderId: "862949045222",
    appId: "1:862949045222:web:d7e20a1a69fc3d8a399c27",
    measurementId: "G-TW6ZBNCDTH"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    let cloudDB = firebase.firestore();

  let NameT = document.getElementById('NameTbox');
  let RollT = document.getElementById('RollTbox');
  let SecT  = document.getElementById('SecTbox');
  let GenT  = document.getElementById('GenTbox');
  
  let nameV,rollV,secV,genV;

  function Update(val,type){
      if(type=='name') nameV=val;
      else if(type=='roll') rollV=val;
      else if(type=='sec')  secV=val;
      else if(type=='gen')  genV=val;
  }

  

//........................Button Events.......................................//
    
    function Add_Doc_WithAutoID(){

        cloudDB.collection("students").add({
            NameOfStd: nameV,
            RollNo: Number(rollV),
            Section: secV,
            Gender: genV
        })

        .then(function (docRef){
            console.log("Document written with ID",docRef.id);
        })
        .catch(function(error){
            console.error("Error adding document", error);
        })
    }

    function Add_Doc_WithID(){

        cloudDB.collection("students").doc(rollV).set({
            NameOfStd: nameV,
            RollNo: Number(rollV),
            Section: secV,
            Gender: genV
        })

        .then(function (){
            console.log("Document written with ID", rollV);
        })
        .catch(function(error){
            console.error("Error adding document", error);
        })
    }

    function Update_Fields_inDocument(){

        cloudDB.collection("students").doc(rollV).update({
            NameOfStd: nameV,
            Section: secV,
            Gender: genV
        })

        .then(function (){
            console.log("Document Updating with ID", rollV);
        })
        .catch(function(error){
            console.error("Error updating document", error);
        })

    }

    function DeleteDocument(){

        cloudDB.collection("students").doc(rollV).delete()

        .then(function (){
            console.log("Document Deleting with ID", rollV);
        })
        .catch(function(error){
            console.error("Error deleting document", error);
        })

    }

    document.getElementById('insertBtn').onclick=function(){

        Add_Doc_WithAutoID();
    }
    
    document.getElementById('selectBtn').onclick=function(){
        Add_Doc_WithID();
    }

    document.getElementById('updateBtn').onclick=function(){
        Update_Fields_inDocument()
    }

    document.getElementById('deleteBtn').onclick=function(){
        DeleteDocument()
    }