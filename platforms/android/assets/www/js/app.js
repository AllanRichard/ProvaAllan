function mostraListaContato() {
  document.getElementById('divNovoContato').style.display = 'none';
  document.getElementById('AbaRemover').style.display = 'none';
  document.getElementById('listagemdeContatos').style.display = 'block';
}


function mostraNovoContato() {
  document.getElementById('listagemdeContatos').style.display = 'none';
  document.getElementById('AbaRemover').style.display = 'none';
  document.getElementById('divNovoContato').style.display = 'block';
}

function mostraRemoverContato() {
  document.getElementById('divNovoContato').style.display = 'none';
  document.getElementById('listagemdeContatos').style.display = 'none';
  document.getElementById('AbaRemover').style.display = 'block';
}


document.getElementById("novoContato").addEventListener("click", criarContato);
document.getElementById("listaContatos").addEventListener("click", listarContatos);
//document.getElementById("abanovoContato").addEventListener("click", abanovoContato);
//document.getElementById("abalistaContatos").addEventListener("click", abalistaContatos);
//document.getElementById("divNovoContato").addEventListener("click", divNovoContato);
//document.getElementById("listadeContatos").addEventListener("click", listadeContatos);

function criarContato() {
   var name = document.getElementById("nome").value;
   var numero = document.getElementById("numero").value;
   var novoContato = navigator.contacts.create({"displayName": name});
   var telefones = [];
   telefones[1] = new ContactField('mobile', numero, true);
   novoContato.phoneNumbers = telefones;
   novoContato.save(ok, erro);
    
   function ok() {
      alert("Contato Salvo!")
   }
  
   function erro(message) {
      alert('falha: ' + message);
   }
  
}


function listarContatos() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;

   fields = ["displayName", "phoneNumbers"];
   navigator.contacts.find(fields, sucesso, falha, options);
    
   contatoDiv = document.querySelector("#contato");
   contatoDiv.innerHTML = "";
   function sucesso(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         contatoDiv.innerHTML += "<b>" + contacts[i].displayName+"</b><br/>"+contacts[i].phoneNumbers[0].value +"<button onclick='removerContato(\"" + contacts[i].displayName + "\")'> Remover </button>" + "<br/>";;
      }
   }
  
   function falha(message) {
      alert('Falha: ' + message);
   }
  
}

function removerContato(nome) {
   var options = new ContactFindOptions();
   options.filter = nome;
   options.multiple = false;
   fields = ["displayName"];
   navigator.contacts.find(fields, buscarContatoOk, buscarContatoErro, options);
   function buscarContatoOk(contacts) {
      var contact = contacts[0];
      contact.remove(removerContatoOk, removerContatoErro);
      function removerContatoOk(contact) {
         alert("Contato Excluido!");
         listarContatos();
      }
      function removerContatoErro(message) {
         alert('Falha: ' + message);
      }
   }
   function buscarContatoErro(message) {
      alert('Falha: ' + message);
   }
}