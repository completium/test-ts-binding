import * as ex from "@completium/experiment-ts";
import { Address, cmp_date, expect_to_fail, Int, Nat, set_mockup_now } from "@completium/experiment-ts";

import { account } from './binding/account'

const assert = require('assert')

/* Accounts ---------------------------------------------------------------- */

const alice = ex.get_account('alice');
const bob = ex.get_account('bob');

/* Endpoint ---------------------------------------------------------------- */

ex.set_mockup()

/* Verbose mode ------------------------------------------------------------ */

ex.set_quiet(true);

/* Now --------------------------------------------------------------------- */

ex.set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[VERIFICATION] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await account.deploy(new Address(alice.pkh), { as: alice })
  });
})

describe('[VERIFICATION] Call entry', async () => {
  it("Call 'add'", async () => {
    const total_before = await account.get_total()
    assert(total_before.equals(new Int(0)))
    await account.add(new Nat(5), { as : alice })
    const total_after = await account.get_total()
    assert(total_after.equals(new Int(5)))
  })
  it("Call 'sub' should fail with INVALID_CALLER", async () => {
    await expect_to_fail(async () => {
      await account.sub({ as : bob })
    }, account.errors.INVALID_CALLER)
  })
  it("Call 'sub' should fail with r1", async () => {
    set_mockup_now(new Date('1970-01-01T00:01'))
    await expect_to_fail(async () => {
      await account.sub({ as : alice })
    }, account.errors.r1)
  })
  it("Call 'sub'", async () => {
    const now = new Date()
    set_mockup_now(new Date(now))
    await account.sub({ as : alice })
    const total_after = await account.get_total()
    assert(total_after.equals(new Int(4)))
    const lastSubDate = await account.get_lastSubDate()
    assert(cmp_date(now, lastSubDate))
  })
})
