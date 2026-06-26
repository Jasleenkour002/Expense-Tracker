const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(__dirname, '../data.json');

function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        const initialData = { users: [], expenses: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const db = {
    users: {
        findOne: async (query) => {
            const { users } = readDB();
            return users.find(u =>
                Object.keys(query).every(key => u[key] === query[key])
            );
        },
        create: async (data) => {
            const dbData = readDB();
            const newUser = {
                _id: crypto.randomUUID(),
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            dbData.users.push(newUser);
            writeDB(dbData);
            return newUser;
        }
    },
    expenses: {
        find: async (query) => {
            const { expenses } = readDB();
            let results = expenses.filter(e => {
                if (query.userId && e.userId !== query.userId) return false;
                if (query.category && e.category !== query.category) return false;
                return true;
            });

            // Simple filter for dates and text (q)
            if (query.date) {
                if (query.date.$gte) {
                    results = results.filter(e => new Date(e.date) >= new Date(query.date.$gte));
                }
                if (query.date.$lte) {
                    results = results.filter(e => new Date(e.date) <= new Date(query.date.$lte));
                }
            }

            if (query.$or) {
                results = results.filter(e => {
                    return query.$or.some(qCond => {
                        const field = Object.keys(qCond)[0];
                        const regex = qCond[field].$regex;
                        return new RegExp(regex, 'i').test(e[field]);
                    });
                });
            }

            return results.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        create: async (data) => {
            const dbData = readDB();
            const newExp = {
                _id: crypto.randomUUID(),
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            dbData.expenses.push(newExp);
            writeDB(dbData);
            return newExp;
        },
        findOneAndDelete: async (query) => {
            const dbData = readDB();
            const index = dbData.expenses.findIndex(e =>
                e._id === query._id && e.userId === query.userId
            );
            if (index === -1) return null;
            const [deleted] = dbData.expenses.splice(index, 1);
            writeDB(dbData);
            return deleted;
        }
    }
};

module.exports = db;
