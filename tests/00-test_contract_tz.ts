import * as ex from "@completium/experiment-ts";
import { Nat, Bytes } from "@completium/archetype-ts-types";

import { contract_tz } from './binding/contract_tz'

const assert = require('assert')

/* Accounts ---------------------------------------------------------------- */

const alice = ex.get_account('alice');

/* Endpoint ---------------------------------------------------------------- */

ex.set_mockup()

/* Verbose mode ------------------------------------------------------------ */

ex.set_quiet(true);

/* Now --------------------------------------------------------------------- */

ex.set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[CONTRACT_TZ] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await contract_tz.originate(new Nat(0), "", new Bytes(""), { as: alice })
  });
})

describe('[CONTRACT_TZ] Call entry', async () => {
  it("Call 'myentry'", async () => {
    const a_before = await contract_tz.get_a();
    assert(a_before.equals(new Nat(0)))
    await contract_tz.e1(new Nat(2), { as : alice })
    const a_after = await contract_tz.get_a();
    assert(a_after.equals(new Nat(2)))
  })
})

