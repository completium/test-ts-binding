import * as ex from "@completium/experiment-ts";
import { Nat } from "@completium/archetype-ts-types";

import { counter_two_numbers } from './binding/counter_two_numbers'

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

describe('[COUNTER_TWO_NUMBERS] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await counter_two_numbers.deploy({ as: alice })
  });
})

describe('[COUNTER_TWO_NUMBERS] Call entry', async () => {
  it("Call 'myentry'", async () => {
    const v1_before = await counter_two_numbers.get_v1()
    assert(v1_before.equals(new Nat(6)))
    const v2_before = await counter_two_numbers.get_v2()
    assert(v2_before.equals(new Nat(7)))
    await counter_two_numbers.incrementBoth(new Nat(3), new Nat(4), { as : alice })
    const v1_after = await counter_two_numbers.get_v1()
    assert(v1_after.equals(new Nat(9)))
    const v2_after = await counter_two_numbers.get_v2()
    assert(v2_after.equals(new Nat(11)))
  })
})
