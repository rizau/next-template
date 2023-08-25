import { DynamicObject } from "@/types"
//import { DataTypes, Error, QueryTypes, Sequelize } from "sequelize"
import { QueryTypes, Sequelize } from "sequelize"
import * as tedious from "tedious"

export class DbServicexxx {
  private sequelize: Sequelize

  constructor() {
    this.sequelize = new Sequelize(
      process.env.NEXT_PUBLIC_DBNAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? +process.env.DB_PORT : 1433,
        dialect: "mssql",
        dialectModule: tedious,
        dialectOptions: {
          instanceName: process.env.DB_INSTANCE,
          options: {
            encrypt: false,
          },
        },
      }
    )

    //models
  }

  public async UpdateOne(
    tbl: string,
    obj: DynamicObject = {},
    whrObj: DynamicObject = {}
  ): Promise<{ ok: boolean; message: string }> {
    if (!whrObj) return { ok: false, message: "Kısıt verilmelidir" }
    const updKeys = Object.keys(obj)
    //const tableCols = keys.join(",");
    const values = updKeys.map((key) => `[${key}]='${obj[key]}'`)
    const updatedStr = values.join(",")

    const filteredWhrArray = Object.entries(whrObj).filter(
      ([key, value]) => value != null
    )
    const filteredWhrObj = Object.fromEntries(filteredWhrArray)
    const whrKeys = Object.keys(filteredWhrObj)
    const whrValues = whrKeys.map((key) => `[${key}]='${whrObj[key]}'`)
    const whrStr = whrValues.join(" AND ")
    try {
      const data = await this.sequelize.query(
        `UPDATE ${tbl}  SET ${updatedStr} WHERE ${whrStr}`,
        { type: QueryTypes.UPDATE }
      )
      return { ok: true, message: "Kayıt güncellendi." }
    } catch (error) {
      return {
        ok: false,
        message: `Sql hata oluştu => while update => ${error}]`,
      }
    }
  }
  /*
  public async  updateOnexxx=(tbl: string, obj = {}, whrObj = {})=> {
    if (!whrObj) return { ok: false, message: "Kısıt verilmelidir" };
    const updKeys = Object.keys(obj);
    //const tableCols = keys.join(",");
    const values = updKeys.map((key) => `[${key}]='${obj[key]}'`);
    const updatedStr = values.join(",");
  
    const filteredWhrArray = Object.entries(whrObj).filter(
      ([key, value]) => value != null
    );
    const filteredWhrObj = Object.fromEntries(filteredWhrArray);
    const whrKeys = Object.keys(filteredWhrObj);
    const whrValues = whrKeys.map((key) => `[${key}]='${whrObj[key]}'`);
    const whrStr = whrValues.join(" AND ");
    try {
      const data = await sequelize.query(
        `UPDATE ${tbl}  SET ${updatedStr} WHERE ${whrStr}`,
        { type: QueryTypes.UPDATE }
      );
      return { ok: true, message: "Kayıt güncellendi.", data };
    } catch (error) {
      return {
        ok: false,
        message: `Sql hata oluştu => ${error.name}:[${error.original ?? ""}]`,
        error,
      };
    }
  }*/

  public async getAccount(Unvan: string): Promise<any> {
    try {
      //return Account.findOne({ where: { code:VknTckn } });
      const db = this.sequelize

      const [results, metedata] = await db.query(
        `SELECT top 1  code FROM TRIOV_CARI WHERE ISIM=N'${Unvan}'`,
        { type: QueryTypes.SELECT }
      )
      //console.log(results);
      return results
    } catch (error) {
      //console.log('getAccount =>', error);
      //return null;
      throw new Error(`Cari bulunurken hata oluştu. ${Unvan} Detail: ${error}`)
    }
  }

  public async getSozlesmeListesi(): Promise<object> {
    try {
      //return Account.findOne({ where: { code:VknTckn } });
      const db = this.sequelize
      const results = await db.query(`SELECT * FROM TRIOVKART`, {
        type: QueryTypes.SELECT, //_TESTKART
      })
      //console.log(results);
      return results
    } catch (error) {
      //console.log('getAccount =>', error);
      //return null;
      throw new Error(`Cari bulunurken hata oluştu. ${name} Detail: ${error}`)
    }
  }

  public async getLastAccount(startWith: string): Promise<any> {
    try {
      const db = this.sequelize
      const [results, metedata] = await db.query(
        `select ISNULL(MAX(CARI_KOD),'${startWith}0') code  from tblcasabit where CARI_KOD  like '${startWith}%'`,
        { type: QueryTypes.SELECT }
      )
      //console.log(results);
      return results
    } catch (error) {
      //console.log('getLastAccount =>', error);
      //return null;
      throw new Error(`Son Cari bulunurken hata oluştu. Detail: ${error}`)
    }
  }
}

const sequelize = new Sequelize({
  dialect: "mssql",
  dialectModule: tedious,
  database: process.env.NEXT_PUBLIC_DBNAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 1433, // Default MSSQL port
  dialectOptions: {
    options: {
      encrypt: false, // Set to true if you're using SSL/TLS
    },
  },
  // models: [__dirname + '/models'], // Path to your models directory
})

export default sequelize

export async function ConnectSql() {
  try {
    await sequelize.authenticate()
    return { ok: true, message: "Successfully connected to MSSQL Database" }
  } catch (error) {
    return {
      ok: false,
      message: "Unable to connect to the MSSQL database",
      error,
    }
  }
}

export const DbService = {
  UpdateOne: async (
    tbl: string,
    obj: DynamicObject = {},
    whrObj: DynamicObject = {}
  ): Promise<{ ok: boolean; message: string }> => {
    if (!whrObj || Object.keys(whrObj).length == 0)
      return { ok: false, message: "Kısıt verilmelidir" }
    const updKeys = Object.keys(obj)
    //const tableCols = keys.join(",");
    const values = updKeys.map((key) => `[${key}]='${obj[key]}'`)
    const updatedStr = values.join(",")

    const filteredWhrArray = Object.entries(whrObj).filter(
      ([key, value]) => value != null
    )
    const filteredWhrObj = Object.fromEntries(filteredWhrArray)
    const whrKeys = Object.keys(filteredWhrObj)
    const whrValues = whrKeys.map((key) => `[${key}]='${whrObj[key]}'`)
    const whrStr = whrValues.join(" AND ")
    try {
      const data = await sequelize.query(
        `UPDATE ${tbl}  SET ${updatedStr} WHERE ${whrStr}`,
        { type: QueryTypes.UPDATE }
      )
      return { ok: true, message: "Kayıt güncellendi." }
    } catch (error) {
      return {
        ok: false,
        message: `Sql hata oluştu => while update => ${error}]`,
      }
    }
  },
}

type Sozlesme = { code: string; name: string }
