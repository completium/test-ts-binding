import { Address, Bytes, Duration, get_account, Int, Nat, Option, Rational, set_mockup, set_mockup_now, set_quiet, Tez } from '@completium/experiment-ts'

const assert = require('assert')

import {
  test_binding,
  all_cmp,
  all
} from './test_binding'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

set_mockup_now(new Date(Date.now()))

/* Test data --------------------------------------------------------------- */

const r_value : all = {
  a : new Nat(14),
  b : new Int(-12),
  c : new Tez(12334, "mutez"),
  d : new Rational(0.456),
  e : true,
  f : new Bytes("0000"),
  g : "a string value",
  h : new Date(),
  i : new Duration(""),
  j : new Address(alice.pkh),
  k : new Option<Nat>(new Nat(4))
}

/* Scenario ---------------------------------------------------------------- */

describe('[Test_binding] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await test_binding.deploy({ as: alice })
  });
})

describe('[Test_binding] Call entry', async () => {
  it("Call 'myentry'", async () => {
    await test_binding.myentry(r_value, { as : alice })
  })
  it("Test 's' value", async () => {
    const s = await test_binding.get_s();
    assert(s.equals(new Int(2)))
  })
  it("Test 'r' value", async () => {
    const r = await test_binding.get_r();
    assert(all_cmp(r_value, r))
  })
})