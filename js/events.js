Backbone.pubSub = _.extend({}, Backbone.Events);
window.data1;
 $(document).ready(function(){
    getContent = function(data){
      var str;
      str += '<p>'+data[0].content+'</p>';
      return str;
    };

    Backbone.pubSub.on('linkClicked', function(link){
      if(link !== 'link2'){
        $('#projectsHelper').fadeOut();
        $('#projectsAlert').fadeOut();
        $.getJSON(link+'.json', function(data){
          console.log(data[0].content);
          $('#midText').append(data[0].content);
          $('#midText').fadeIn();
          });
      }
      else{
        $('#projectsHelper').fadeIn();
        if(window.data1 === undefined){
          $('#projectsAlert').fadeIn();
          $.getJSON('https://api.github.com/users/dtx/repos?callback=?', function(data){
            //i know for...in is bad for arrays and Strings, but idc atm.
            window.data1 = data.data;
            console.log(data1);
            for( var i in data1){
              var repo = new gitModel(data1[i]);
              var gitV = new gitView({model:repo});
              gitV.render();
            }
            $('#midText').fadeIn();
          });
        }
       else{
          $('#projectsAlert').fadeOut();
          for( var i in window.data1){
              var repo = new gitModel(window.data1[i]);
              var gitV = new gitView({model:repo});
              gitV.render();
          }
          $('#midText').fadeIn();
       }
      }
    });

    var me = new Portfolio();
    var menu = new Menu();
    var aboutMe = new aboutMeView({model: me});
    var menuLink = new menuView({model:menu});
  });
