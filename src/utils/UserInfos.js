export default async (client) => {
    const user = await client.db.user.findOne({ _id: this.user.id });
    if (!user) await client.db.user.create({ _id: this.user.id });
}