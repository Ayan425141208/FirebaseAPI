       
       var ImgName, ImgUrl,src;
       var files = [];
       var reader,i;
       
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
        
        var storageRef = firebase.storage().ref();
        var databaseRef = firebase.database();
        document.getElementById("select").onclick = function(e){

          var input = document.createElement('input');
          input.type= 'file';
          
          input.onchange = e => {
            files = e.target.files;
            reader = new FileReader();
            reader.onload = function(){
      
              document.getElementById("myimg").src = reader.result;
            }
            reader.readAsDataURL(files[0]);
          }
          input.click();
        }
        
      
      
        document.getElementById("upload").onclick = function(){
          ImgName = document.getElementById('namebox').value;
          //let imageZ = files[0].resize({innerWidth:'64',innerHeight:'64'})
          var uploadTask = firebase.storage().ref("Images/"+ImgName+".ico").put(files[0]);

          uploadTask.on("state_changed", function(snapshot){
            var progess = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            document.getElementById('UpProgress').innerHTML = "Upload "+progess+"%";
          },
          
          function(error){
            alert('error in saving the image');
          },

          function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            ImgUrl = url;
            src = document.getElementById('imageUrl').value;
            firebase.database().ref("Pictures/"+ImgName).set({
              Name: ImgName,
              Link: ImgUrl,
              ImageSrc: src
            });
            
            alert("Image has uploaded successfully.");  
          });
        });
       }
       
        document.getElementById("retrieve").onclick = function(){
         
          
          let ImgName = document.getElementById('existing').value;
          /*
          .......................... get image url code ..................................
          let displayImg = storageRef.child('Images/'+ImgName+'.png').getDownloadURL();
          storageRef.child('Images/'+ImgName+'.png').getDownloadURL().then(function(url){
            
            document.getElementById('myimg') = url;
          })*/
          databaseRef.ref('Pictures/'+ImgName).on('value', function(snapshot){
             document.getElementById('myimg').src = snapshot.val().Link;
          });  
          
        }

        document.getElementById("delet").onclick = function(){
          
          let ImgName = document.getElementById('existing').value;
          console.log("DELETE IMAGE FROM FIREBASE STORAGE")
          let resultlink = storageRef.child('Images/'+ImgName+'.ico').delete();
          //console.log(resultlink);
          deletDatabase(ImgName);

          alert("Image has deleted successfully");
        }

        function deletDatabase(Img){

          let getDatabaseURL = databaseRef.ref().child('Pictures/'+Img).remove();
          //console.log(getDatabaseURL);
        }

        document.getElementById("update").onclick = function(){

          let existImage = document.getElementById('existing').value;
          let ImgName = document.getElementById('namebox').value;
          console.log("DELETE IMAGE FROM FIREBASE STORAGE")
          let resultlink = storageRef.child('Images/'+existImage+'.ico').delete();
          //console.log(resultlink);
          deletDatabase(existImage);

          alert("Image has deleted successfully");
          UploadImage(ImgName);
        }

        function UploadImage(getImage){
          var uploadTask = firebase.storage().ref("Images/"+getImage+".ico").put(files[0]);

          uploadTask.on("state_changed", function(snapshot){
            var progess = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            document.getElementById('UpProgress').innerHTML = "Upload "+progess+"%";
          },
          
          function(error){
            alert('error in saving the image');
          },

          function() {
              uploadTask.snapshot.ref.getDownloadURL().then(function(url){
              ImgUrl = url;
              src = document.getElementById('imageUrl').value;
              firebase.database().ref("Pictures/"+getImage).set({
                Name: getImage,
                Link: ImgUrl,
                ImageSrc: src
              });

              alert("Bildet er lastet opp.");  
            });
          });
        }
