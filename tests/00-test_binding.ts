import { Address, Bytes, Duration, get_account, Int, Nat, Option, Rational, set_mockup, set_mockup_now, set_quiet, Tez } from '@completium/experiment-ts'

const assert = require('assert')

import {
  test_binding,
  all_cmp,
  all,
  visitor_2_value_cmp,
  visitor_2_container,
  mich_to_visitor_2_value,
  visitor_2_value
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
  k : new Option<Nat>(new Nat(4)),
  n : [ "an list element" ],
  p : [ ["a tuple set element", new Nat(7), new Int(9) ],
        ["another tuple set element", new Nat(8), new Int(10)]
      ]
}

const l_value = [ new Int(2), new Int(4), new Int(6) ]

const l1_value = [ r_value, r_value ]

const l2_value = [ l1_value ]

const m_value : Array<[ Nat, [ string, Int ] ]> = [ [ new Nat(3), [ "test", new Int(5) ] ] ]

const s1_value = [ new Nat(3), new Nat(4), new Nat(5) ]

const visitor_value : Array<[ Address, Nat ]> = [ [ new Address(alice.pkh), new Nat(1) ] ]

const visitor_2_value : visitor_2_value = {
  nb_visits2 : new Nat(1),
  last : new Date()
}

const visitor_2_container : visitor_2_container = [ [ new Address(alice.pkh), visitor_2_value ] ]

const just_a_key_container : Address[] = [ new Address(alice.pkh) ]

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
  it("Test 's' int value getter", async () => {
    const s = await test_binding.get_s();
    assert(s.equals(new Int(2)))
  })
  it("Test 'r' value record getter", async () => {
    const r = await test_binding.get_r();
    assert(all_cmp(r_value, r))
  })
  it("Test 'l' value list of int getter", async () => {
    const l = await test_binding.get_l();
    assert(l.length == l_value.length)
    for (let i = 0; i < l.length; i++) {
      assert(l[i].equals(l_value[i]))
    }
  })
  it("Test 'l1' value list of record 'all' getter", async () => {
    const l1 = await test_binding.get_l1();
    assert(l1.length == l1_value.length)
    for (let i = 0; i < l1.length; i++) {
      assert(all_cmp(l1[i], l1_value[i]))
    }
  })
  it("Test 'l2' value list of list of record 'all' getter", async () => {
    const l2 = await test_binding.get_l2();
    assert(l2.length == l2_value.length)
    for (let j = 0; j < l2.length; j++) {
      for (let i = 0; i < l2[j].length; i++) {
        assert(all_cmp(l2[j][i], l2_value[j][i]))
      }
    }
  })
  it("Test 'm' value map of nat to pair of string int getter", async () => {
    const m = await test_binding.get_m();
    assert(m.length == m_value.length)
    for (let i = 0; i < m.length; i++) {
      assert(m[i][0].equals(m_value[i][0]))
      assert(m[i][1][0] == m_value[i][1][0])
      assert(m[i][1][1].equals(m_value[i][1][1]))
    }
  })
  it("Test 's1' value set of nat getter", async () => {
    const s1 = await test_binding.get_s1()
    assert(s1.length == s1_value.length)
    for (let i = 0; i < s1.length; i++) {
      assert(s1[i].equals(s1_value[i]))
    }
  })
  it("Test 'visitor' one field asset value getter", async () => {
    const v = await test_binding.get_visitor()
    assert(v.length == visitor_value.length)
    for (let i = 0; i < v.length; i++) {
      assert(v[i][0].equals(visitor_value[i][0]))
      assert(v[i][1].equals(visitor_value[i][1]))
    }
  })
  it("Test 'visitor2' several fields asset value getter", async () => {
    const v = await test_binding.get_visitor_2()
    assert(v.length == visitor_2_container.length)
    for (let i = 0; i < v.length; i++) {
      assert(v[i][0].equals(visitor_2_container[i][0]))
      assert(visitor_2_value_cmp(v[i][1], visitor_2_value))
    }
  })
  it("Test 'just_a_key' one key field asset getter", async () => {
    const v = await test_binding.get_just_a_key()
    assert(v.length == just_a_key_container.length)
    for (let i = 0; i < v.length; i++) {
      assert(v[i].equals(just_a_key_container[i]))
    }
  })
})