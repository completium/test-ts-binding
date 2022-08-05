import { get_account, Nat, Int, Tez, Rational, Bytes, Duration, Address, Option, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'

const assert = require('assert')

import {
  test_binding,
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

/* Scenario ---------------------------------------------------------------- */

describe('[Test_binding] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await test_binding.deploy({ as: alice })
  });
})

describe('[Test_binding] Call entry', async () => {
  it("Call 'myentry'", async () => {
    const r : all = {
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
    await test_binding.myentry(r, { as : alice })
    const s = await test_binding.get_s();
    assert(s.equals(new Int(2)))
  })
})