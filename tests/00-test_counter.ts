import * as ex from "@completium/experiment-ts";
import { Nat } from "@completium/experiment-ts";

import { counter } from './binding/counter'

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

describe('[COUNTER] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await counter.deploy({ as: alice })
  });
})

describe('[COUNTER] Call entry', async () => {
  it("Call 'increment'", async () => {
    const s_before = await counter.get_count()
    assert(s_before.equals(new Nat(2)))
    await counter.increment({ as : alice })
    const s_after = await counter.get_count()
    assert(s_after.equals(new Nat(3)))
  })
})
