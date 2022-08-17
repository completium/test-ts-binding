import * as ex from "@completium/experiment-ts";
import { Nat } from "@completium/experiment-ts";

import { addnumber } from './binding/addnumber'

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

describe('[ADDNUMBER] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await addnumber.deploy({ as: alice })
  });
})

describe('[ADDNUMBER] Call entry', async () => {
  it("Call 'increment'", async () => {
    const s_before = await addnumber.get_count()
    assert(s_before.equals(new Nat(2)))
    await addnumber.increment(new Nat(5), { as : alice })
    const s_after = await addnumber.get_count()
    assert(s_after.equals(new Nat(7)))
  })
})
