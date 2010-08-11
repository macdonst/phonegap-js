var Contact = function() {
  this.name = new ContactName();
  this.emails = [];
  this.phones = [];
}

var ContactName = function() {
  this.formatted = "";
  this.familyName = "";
  this.givenName = "";
  this.additionalNames = [];
  this.prefixes = [];
  this.suffixes = [];
}


var ContactEmail = function() {
  this.types = [];
  this.address = "";
}

var ContactPhoneNumber = function() {
  this.types = [];
  this.number = "";
}


var Contacts = function() {
  this.records = [];  
}

Contacts.prototype.find = function(obj, win, fail) {
    if(obj.name != null) {
	// Build up the search term that we'll use in SQL, based on the structure/contents of the contact object passed into find.
	   var searchTerm = '';
	   if (obj.name.givenName && obj.name.givenName.length > 0) {
			searchTerm = obj.name.givenName.split(' ').join('%');
	   }
	   if (obj.name.familyName && obj.name.familyName.length > 0) {
			searchTerm += obj.name.familyName.split(' ').join('%');
	   }
	   if (!obj.name.familyName && !obj.name.givenName && obj.name.formatted) {
			searchTerm = obj.name.formatted;
	   }
	   PhoneGap.execAsync(PhoneGap.close(this, this.m_foundContact, [win]), fail, 'com.phonegap.Contacts', 'find', [searchTerm]);
  }
}

Contacts.prototype.m_foundContact = function(args, callback) {
  var contact = new Contact();
  contact.name = new ContactName();
  contact.name.formatted = args.name;
  contact.name.givenName = args.name;
  var mail = new ContactEmail();
  mail.types.push("home");
  mail.address = args.email;
  contact.emails.push(mail);
  phone = new ContactPhoneNumber();
  phone.types.push("home");
  phone.number = args.npa;
  contact.phones.push(phone);
  //this.records.push(contact);
}

Contacts.prototype.droidDone = function() {
  this.win(this.records);
}

PhoneGap.addConstructor('contacts', new Contacts());
