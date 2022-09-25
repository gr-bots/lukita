export default async (client, user) => {
    const user = await client.db.user.findOne({ _id: user.id });
    if (!user) await client.db.user.create({ _id: user.id });
}