import * as ex from "@completium/experiment-ts";
import { expect_to_fail } from "@completium/experiment-ts";
import { Nat, Tez } from "@completium/archetype-ts-types";

import { charity } from './binding/charity'

const assert = require('assert')

/* Accounts ---------------------------------------------------------------- */

const alice = ex.get_account('alice');
const bob   = ex.get_account('bob');
const carl  = ex.get_account('carl');

/* Endpoint ---------------------------------------------------------------- */

ex.set_mockup()

/* Verbose mode ------------------------------------------------------------ */

ex.set_quiet(true);

/* Now --------------------------------------------------------------------- */

ex.set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[CHARITY] Contract deployment', async () => {
  it('Deploy charity', async () => {
    await charity.deploy(alice.get_address(), { as: alice })
  });
})

describe('[CHARITY] Call donate', async () => {
  it("Call 'donate' with 10 tz as carl", async () => {
    const b_before = await charity.get_balance()
    await charity.donate({ as : carl, amount : new Tez(10)})
    const b_after = await charity.get_balance()
    assert(b_before.plus(new Tez(10)).equals(b_after))
  })
  it("Call 'donate' with 5 tz as bob", async () => {
    const b_before = await charity.get_balance()
    await charity.donate({ as : bob, amount : new Tez(5)})
    const b_after = await charity.get_balance()
    assert(b_before.plus(new Tez(5)).equals(b_after))
  })
 })
 describe('[CHARITY] Call collect', async () => {
  it("Call 'collect' as carl should fail", async () => {
    expect_to_fail(async () => {
      await charity.collect(new Tez(15), { as : carl })
    }, charity.errors.INVALID_CALLER)
  })
  it("Call 'collect' with large amount should fail", async () => {
    expect_to_fail(async () => {
      await charity.collect(new Tez(500), { as : alice })
    }, charity.errors.r1)
  })
  it("Call 'collect'", async () => {
    await charity.collect(new Tez(15), { as : alice })
    const b_final = await charity.get_balance()
    assert(b_final.equals(new Tez(0)))
  })
 })



