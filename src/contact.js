// http://www.w3.org/TR/contacts-api/

var Contact = function(id, displayName, name, nickname, phoneNumbers, emails, addresses,
    ims, organizations, published, updated, birthday, anniversary, gender, note, 
    preferredUsername, photos, tags, relationships, urls, accounts, utcOffset, connected) {
    this.id = '';
    this.displayName = '';
    this.name = null; // ContactName
    this.nickname = '';
    this.poneNumbers = null; // ContactField[]
    this.emails = null; // ContactField[]
    this.addresses = null; // ContactAddress[]
    this.ims = null; // ContactField[]
    this.organizations = null; // ContactOrganization[]
    this.published = '';
    this.updated = '';
    this.birthday = '';
    this.anniversary = '';
    this.gender = '';
    this.note = '';
    this.preferredUsername = '';
    this.photos = null; // ContactField[]
    this.tags = null; // ContactField[]
    this.relationships = null; // ContactField[]
    this.urls = null; // ContactField[]
    this.accounts = null; // ContactAccount[]
    this.utcOffset = '';
    this.connected = '';
};

var ContactName = function(formatted, familyName, givenName, middle, prefix, suffix) {
    this.formatted = formatted || '';
    this.familyName = familyName || '';
    this.givenName = givenName || '';
    this.middleName = middle || '';
    this.honorificPrefix = prefix || '';
    this.honorificSuffix = suffix || '';
};

var ContactField = function(type, value, primary) {
    this.type = type || '';
    this.value = value || '';
    this.primary = primary || '';
};

var ContactAddress = function() {
    this.formatted = formatted || '';
    this.streetAddress = streetAddress || '';
    this.locality = locality || '';
    this.region = region || '';
    this.postalCode = postalCode || '';
    this.country = country || '';
};

var ContactOrganization = function(name, dept, title, startDate, endDate, location, desc) {
    this.name = name || '';
    this.department = dept || '';
    this.title = title || '';
    this.startDate = startDate || '';
    this.endDate = endDate || '';
    this.location = location || '';
    this.description = desc || '';
};


var Contacts = function() {
    this.inProgress = false;
}

Contacts.prototype.find = function(fields, win, fail, options) {
    this.inProgress = true;
    var self = this;
    PhoneGap.exec(function(contacts) {
            self.m_foundContacts(win, contacts);
        }, fail, 'com.phonegap.Contacts', 'find', [fields, options]);
};

Contacts.prototype.remove = function(contact) {
    
};

Contacts.prototype.save = function(contact) {
    
};

Contacts.prototype.create = function(contact) {
    
};

Contacts.prototype.m_foundContacts = function(win, contacts) {
    this.inProgress = false;
    win(contacts);
};


var ContactFindOptions = function() {
    this.filter = '';
    this.multiple = true;
    this.limit = 0;
    this.updatedSince = 0;
};

var ContactError = function() {
};

ContactError.INVALID_ARGUMENT_ERROR = 0;
ContactError.IO_ERROR = 1;
ContactError.NOT_FOUND_ERROR = 2;
ContactError.NOT_SUPPORTED_ERROR = 3;
ContactError.PENDING_OPERATION_ERROR = 4;
ContactError.PERMISSION_DENIED_ERROR = 5;
ContactError.TIMEOUT_ERROR = 6;
ContactError.UNKNOWN_ERROR = 7;

PhoneGap.addConstructor('contacts', new Contacts());
