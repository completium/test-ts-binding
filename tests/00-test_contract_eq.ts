import { Bytes, Nat } from "@completium/archetype-ts-types";
import * as ex from "@completium/experiment-ts";

import { contract_eq } from './binding/contract_eq'

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

describe('[CONTRACT_EQ] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await contract_eq.originate(new Nat(0), "", new Bytes(""), true, { as: alice })
  });
})

describe('[CONTRACT_EQ] Call entry', async () => {
  it("Call 'set_a'", async () => {
    const a_before = await contract_eq.get_a();
    assert(a_before.equals(new Nat(0)))
    await contract_eq.set_a(new Nat(2), { as: alice })
    const a_after = await contract_eq.get_a();
    assert(a_after.equals(new Nat(2)))
  })

  it("Call 'set_b'", async () => {
    const b_before = await contract_eq.get_b();
    assert(b_before == "")
    await contract_eq.set_b("mystr", { as: alice })
    const b_after = await contract_eq.get_b();
    assert(b_after == "mystr")
  })


  it("Call 'set_c'", async () => {
    const c_before = await contract_eq.get_c();
    assert(c_before.equals(new Bytes("")))
    await contract_eq.set_c(new Bytes("ff"), { as: alice })
    const c_after = await contract_eq.get_c();
    assert(c_after.equals(new Bytes("ff")))
  })

  it("Call 'set_d'", async () => {
    const d_before = await contract_eq.get_d();
    assert(d_before)
    await contract_eq.set_d(false, { as: alice })
    const d_after = await contract_eq.get_d();
    assert(!d_after)
  })
})

