export default async (client, user) => {
    const useri = await client.db.user.findOne({ _id: user.id });
    if (!useri) await client.db.user.create({ _id: user.id });
}