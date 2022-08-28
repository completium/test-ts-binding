import * as ex from "@completium/experiment-ts";
const collect_arg_to_mich = (requestedAmount: ex.Tez): ex.Micheline => {
    return requestedAmount.to_mich();
}
const donate_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
export class Charity {
    address: string | undefined;
    get_address(): ex.Address {
        if (undefined != this.address) {
            return new ex.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<ex.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new ex.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(owner: ex.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/charity.arl", {
            owner: owner.toString()
        }, params);
        this.address = address;
    }
    async collect(requestedAmount: ex.Tez, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "collect", collect_arg_to_mich(requestedAmount), params);
        }
    }
    async donate(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "donate", donate_arg_to_mich(), params);
        }
    }
    async get_owner(): Promise<ex.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Address(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: ex.pair_to_mich([ex.string_to_mich("\"INVALID_CONDITION\""), ex.string_to_mich("\"r1\"")]),
        INVALID_CALLER: ex.string_to_mich("\"INVALID_CALLER\"")
    };
}
export const charity = new Charity();
