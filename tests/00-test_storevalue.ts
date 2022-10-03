import * as ex from "@completium/experiment-ts";
import { expect_to_fail, set_mockup_now } from "@completium/experiment-ts";
import { Address, cmp_date, Int, Nat } from "@completium/archetype-ts-types";

import { storevalue } from './binding/storevalue'

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

describe('[STOREVALUE] Contract deployment', async () => {
  it('Deploy storevalue', async () => {
    await storevalue.deploy(new Nat(15), { as: alice })
  });
})

describe('[STOREVALUE] Call replace', async () => {
  it("Call 'replace' should fail", async () => {
    await expect_to_fail(async () => {
      await storevalue.replace(new Nat(101), { as : alice })
    }, storevalue.errors.r1)
  })
  it("Call 'replace'", async () => {
    const new_counter = new Nat(20)
    await storevalue.replace(new_counter, { as : alice })
    const counter = await storevalue.get_counter()
    assert(counter.equals(new Nat(20)))
  })
})
