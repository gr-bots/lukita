class Command {
  constructor(client, options) {
     this.client = client
     this.name = options.name
     this.description = options.description
    this.a = options.a
    this.options = options.options
   }
}
module.exports = Command