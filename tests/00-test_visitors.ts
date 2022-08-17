import * as ex from "@completium/experiment-ts";
import { Nat } from "@completium/experiment-ts";

import { visitor_value_cmp, visitors } from './binding/visitors'

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

describe('[VISITORS] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await visitors.deploy({ as: alice })
  });
})

describe('[VISITORS] Call entry', async () => {
  it("Call 'register'", async () => {
    const visitors_before = await visitors.get_visitor()
    assert(visitors_before.length === 0)
    await visitors.register("alice", "Alice", { as : alice })
    const visitors_after = await visitors.get_visitor()
    assert(visitors_after.length === 1)
    assert(visitor_value_cmp(visitors_after[0][1], { name: "Alice", nbvisits: new Nat(0) }))
  })
  it("Call 'visit'", async () => {
    await visitors.visit("alice", { as : alice })
    const visitors_after = await visitors.get_visitor()
    assert(visitors_after.length === 1)
    assert(visitor_value_cmp(visitors_after[0][1], { name: "Alice", nbvisits: new Nat(1) }))
  })
})

