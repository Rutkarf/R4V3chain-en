export type AppLocale = 'en';

export type LocaleKey =
  | 'skip.main'
  | 'locale.toggle'
  | 'panel.collapse'
  | 'panel.expand'
  | 'dock.wallet'
  | 'dock.faucet'
  | 'dock.pending'
  | 'dock.block'
  | 'dock.transactions'
  | 'transactions.composer'
  | 'transactions.mempool'
  | 'transactions.viewMempool'
  | 'transactions.createTx'
  | 'transactions.refreshAll'
  | 'transactions.refreshPending'
  | 'transactions.filter'
  | 'transactions.mineAll'
  | 'transactions.miningAll'
  | 'transactions.mempoolEmpty'
  | 'transactions.mempoolCount'
  | 'dock.chain'
  | 'dock.market'
  | 'dock.quests'
  | 'dock.peers'
  | 'peers.title'
  | 'peers.networkPeers'
  | 'peers.avgLatency'
  | 'peers.networkLoad'
  | 'peers.search'
  | 'peers.filterAll'
  | 'peers.filterConnected'
  | 'peers.filterFavorites'
  | 'peers.connect'
  | 'peers.connectPeer'
  | 'peers.loginRequired'
  | 'peers.refresh'
  | 'peers.copy'
  | 'peers.retry'
  | 'peers.empty'
  | 'peers.emptyFilter'
  | 'peers.summary'
  | 'peers.statusConnected'
  | 'peers.statusConnecting'
  | 'peers.statusDisconnected'
  | 'peers.statusError'
  | 'peers.errorLoad'
  | 'peers.errorConnect'
  | 'peers.errorReconnect'
  | 'peers.errorCopy'
  | 'peers.errorLoginAdd'
  | 'peers.errorLoginReconnect'
  | 'peers.errorInvalidUrl'
  | 'peers.errorInvalidFormat'
  | 'peers.successAdded'
  | 'peers.successReconnected'
  | 'peers.successCopied'
  | 'peers.connectPlaceholder'
  | 'peers.favAdd'
  | 'peers.favRemove'
  | 'peers.disconnect'
  | 'peers.errorDisconnect'
  | 'peers.errorLoginDisconnect'
  | 'peers.successDisconnected'
  | 'peers.estimated'
  | 'peers.errorRateLimit'
  | 'peers.errorStats'
  | 'peers.detailTitle'
  | 'peers.detailClose'
  | 'peers.detailUrl'
  | 'peers.detailStatus'
  | 'peers.detailMessage'
  | 'peers.detailLatency'
  | 'peers.detailSync'
  | 'peers.detailLastSync'
  | 'peers.detailChainHeight'
  | 'peers.openDetail'
  | 'dock.admin'
  | 'admin.title'
  | 'admin.subtitle'
  | 'admin.refresh'
  | 'admin.collected'
  | 'admin.alerts'
  | 'admin.noAlerts'
  | 'admin.gauges'
  | 'admin.latency'
  | 'admin.counters'
  | 'admin.events'
  | 'admin.noEvents'
  | 'admin.loading'
  | 'admin.error'
  | 'admin.seedTitle'
  | 'admin.seedHint'
  | 'admin.seedLabel'
  | 'admin.seedNotConfigured'
  | 'admin.unlock'
  | 'admin.unlocking'
  | 'admin.lock'
  | 'admin.sessionUntil'
  | 'admin.socLead'
  | 'admin.exportLead'
  | 'admin.exportAll'
  | 'admin.opsOptional'
  | 'chain.title'
  | 'chain.view.list'
  | 'chain.view.graph'
  | 'chain.filter.wallet'
  | 'chain.filter.from'
  | 'chain.filter.to'
  | 'chain.filter.search'
  | 'chain.filter.reset'
  | 'chain.filter.results'
  | 'chain.export'
  | 'chain.copyTip'
  | 'chain.copySuccess'
  | 'chain.copyError'
  | 'chain.exportSuccess'
  | 'chain.valid'
  | 'chain.invalid'
  | 'chain.syncing'
  | 'chain.errorSync'
  | 'chain.empty'
  | 'chain.noMatch'
  | 'chain.retry'
  | 'chain.refresh'
  | 'chain.viewMode'
  | 'chain.blocksLabel'
  | 'chain.syncedLabel'
  | 'chain.syncingLabel'
  | 'quests.title'
  | 'quests.xp'
  | 'quests.pendingRewards'
  | 'quests.pendingRewardsHint'
  | 'quests.reset'
  | 'quests.refresh'
  | 'quests.error'
  | 'quests.errorState'
  | 'quests.errorCatalog'
  | 'quests.errorRateLimit'
  | 'quests.mission'
  | 'quests.claim'
  | 'quests.details'
  | 'quests.daily'
  | 'quests.auto'
  | 'quests.autoHint'
  | 'quests.weekly'
  | 'quests.xpBoost'
  | 'quests.claimWeekly'
  | 'quests.crateLocked'
  | 'quests.login'
  | 'quests.go'
  | 'quests.walletLink'
  | 'quests.walletRequired'
  | 'quests.claimSuccess'
  | 'quests.claimFailed'
  | 'quests.missionSuccess'
  | 'quests.missionFailed'
  | 'quests.weeklySuccess'
  | 'quests.weeklyFailed'
  | 'quests.autoDone'
  | 'quests.done'
  | 'quests.completed'
  | 'quests.newQuestsIn'
  | 'quests.guardianRole'
  | 'quests.guardianTagline'
  | 'quests.weeklyClaimBtn'
  | 'quests.weeklyLockedHint'
  | 'wallet.title'
  | 'wallet.network'
  | 'wallet.refresh'
  | 'wallet.create'
  | 'wallet.creating'
  | 'wallet.noWallet'
  | 'wallet.totalBalance'
  | 'wallet.holdings.title'
  | 'wallet.holdings.others'
  | 'wallet.holdings.toggle'
  | 'wallet.holdings.swapHint'
  | 'wallet.fiatApprox'
  | 'wallet.available'
  | 'wallet.networkMetric'
  | 'wallet.account'
  | 'wallet.noAddress'
  | 'wallet.send'
  | 'wallet.swap'
  | 'wallet.receive'
  | 'wallet.mine'
  | 'wallet.mining'
  | 'wallet.login'
  | 'wallet.explorer.title'
  | 'wallet.explorer.address'
  | 'wallet.explorer.lookup'
  | 'wallet.explorer.useMine'
  | 'wallet.explorer.result'
  | 'wallet.recent.title'
  | 'wallet.recent.empty'
  | 'wallet.recent.hint'
  | 'wallet.keys.title'
  | 'wallet.keys.public'
  | 'wallet.keys.private'
  | 'wallet.keys.show'
  | 'wallet.keys.hide'
  | 'wallet.keys.copy'
  | 'wallet.keys.showPrivate'
  | 'wallet.keys.privateWarning'
  | 'wallet.keys.confirmReveal'
  | 'wallet.keys.confirmReveal.ok'
  | 'wallet.keys.confirmReveal.cancel'
  | 'wallet.send.title'
  | 'wallet.send.recipient'
  | 'wallet.send.amount'
  | 'wallet.send.memo'
  | 'wallet.send.confirm'
  | 'wallet.send.sending'
  | 'wallet.send.confirmTitle'
  | 'wallet.send.confirmHint'
  | 'wallet.send.confirmYes'
  | 'wallet.send.confirmCancel'
  | 'wallet.receive.title'
  | 'wallet.receive.addressLabel'
  | 'wallet.receive.copy'
  | 'wallet.validation.recipient'
  | 'wallet.validation.amount'
  | 'faucet.title'
  | 'faucet.subtitle'
  | 'faucet.refresh'
  | 'faucet.cooldown'
  | 'faucet.timeLeft'
  | 'faucet.claim'
  | 'faucet.claiming'
  | 'faucet.loginRequired'
  | 'faucet.walletRequired'
  | 'faucet.history'
  | 'faucet.historyEmpty'
  | 'faucet.viewAll'
  | 'faucet.viewLess'
  | 'faucet.network'
  | 'faucet.peers'
  | 'faucet.block'
  | 'faucet.txCopy'
  | 'faucet.walletLinked'
  | 'faucet.networkUnknown'
  | 'faucet.networkOnline'
  | 'faucet.networkOffline'
  | 'faucet.claimAmountLabel'
  | 'faucet.claimPerDrop'
  | 'faucet.cooldownConfig'
  | 'faucet.nextEligibleAt'
  | 'faucet.nextEligibleAtEmpty'
  | 'faucet.claimSuccess'
  | 'faucet.claimSuccessBalance'
  | 'faucet.txExplorer'
  | 'faucet.txCopied'
  | 'faucet.txCopyFailed'
  | 'faucet.error.loginRequired'
  | 'faucet.error.walletRequired'
  | 'faucet.error.claimFailed'
  | 'faucet.error.loadFailed'
  | 'faucet.error.loadConfigFailed'
  | 'faucet.claimIncrementHint'
  | 'faucet.networkHint'
  | 'faucet.peersHint'
  | 'faucet.blockHint'
  | 'faucet.peersConnectedOnly'
  | 'faucet.peersConnectedTotal'
  | 'faucet.disabled'
  | 'faucet.offline'
  | 'faucet.retry'
  | 'faucet.atMaxClaim'
  | 'faucet.blockExplorer'
  | 'faucet.exportHistory'
  | 'faucet.loadMore'
  | 'faucet.walletInvalidHint'
  | 'faucet.error.walletInvalid'
  | 'faucet.error.rateLimited'
  | 'faucet.error.featureDisabled'
  | 'faucet.error.offline'
  | 'auth.eyebrow'
  | 'auth.loginTitle'
  | 'auth.registerTitle'
  | 'auth.tabLogin'
  | 'auth.tabRegister'
  | 'auth.tabListLabel'
  | 'auth.identifier'
  | 'auth.username'
  | 'auth.email'
  | 'auth.password'
  | 'auth.identifierPlaceholder'
  | 'auth.usernamePlaceholder'
  | 'auth.emailPlaceholder'
  | 'auth.passwordPlaceholder'
  | 'auth.passwordRegisterPlaceholder'
  | 'auth.showPassword'
  | 'auth.hidePassword'
  | 'auth.submitLogin'
  | 'auth.submitLoginLoading'
  | 'auth.submitRegister'
  | 'auth.submitRegisterLoading'
  | 'auth.orContinueWith'
  | 'auth.google'
  | 'auth.meta'
  | 'auth.apple'
  | 'auth.microsoft'
  | 'auth.github'
  | 'auth.x'
  | 'auth.discord'
  | 'auth.oauthUnavailable'
  | 'auth.oauthMock'
  | 'auth.oauthRedirecting'
  | 'auth.close'
  | 'auth.emailCodeTitle'
  | 'auth.emailCodeHint'
  | 'auth.emailCodeLabel'
  | 'auth.emailCodeSubmit'
  | 'auth.emailResend'
  | 'auth.twoFactorTitle'
  | 'auth.twoFactorHint'
  | 'auth.twoFactorLabel'
  | 'auth.twoFactorSubmit'
  | 'auth.twoFactorOpen'
  | 'auth.twoFactorSetupHint'
  | 'auth.twoFactorSecret'
  | 'auth.twoFactorEnable'
  | 'auth.twoFactorDisableHint'
  | 'auth.twoFactorDisable'
  | 'auth.challengeBack'
  | 'auth.validation.required'
  | 'auth.validation.identifierMin'
  | 'auth.validation.usernamePattern'
  | 'auth.validation.email'
  | 'auth.validation.passwordMin'
  | 'auth.switchToRegister'
  | 'auth.switchToLogin';

const MESSAGES: Record<AppLocale, Record<LocaleKey, string>> = {
  en: {
    'skip.main': 'Skip to main content',
    'locale.toggle': 'Change language',
    'panel.collapse': 'Collapse',
    'panel.expand': 'Expand',
    'dock.wallet': 'Wallet',
    'dock.faucet': 'Faucet',
    'dock.pending': 'Pending transactions',
    'dock.block': 'Block composer',
    'dock.transactions': 'Queue',
    'transactions.composer': 'Compose',
    'transactions.mempool': 'Queue',
    'transactions.viewMempool': 'View queue',
    'transactions.createTx': 'CREATE',
    'transactions.refreshAll': 'Refresh queue',
    'transactions.refreshPending': 'Refresh',
    'transactions.filter': 'Filter',
    'transactions.mineAll': 'Mine all',
    'transactions.miningAll': 'Mining…',
    'transactions.mempoolEmpty': 'Queue empty',
    'transactions.mempoolCount': '{count} pending',
    'dock.chain': 'Chain explorer',
    'dock.market': 'Market',
    'dock.quests': 'Quests',
    'dock.peers': 'Peers',
    'dock.admin': 'Administration',
    'admin.title': 'Management panel',
    'admin.subtitle': 'Type 1 and 2 controls — seed unlock',
    'admin.refresh': 'Refresh metrics',
    'admin.collected': 'Collected',
    'admin.alerts': 'Alerts',
    'admin.noAlerts': 'No active alerts',
    'admin.gauges': 'Gauges',
    'admin.latency': 'HTTP latency',
    'admin.counters': 'Counters',
    'admin.events': 'Recent events',
    'admin.noEvents': 'No recent events',
    'admin.loading': 'Loading metrics…',
    'admin.error': 'Unable to load the operations snapshot.',
    'admin.seedTitle': 'Administration — seed required',
    'admin.seedHint':
      'Enter the 24-word seed (local file deploy/admin-seed.local.txt). No wallet key.',
    'admin.seedLabel': 'Admin seed',
    'admin.seedNotConfigured': 'Seed fingerprint not configured on the server (R4V3CHAIN_ADMIN_SEED_SHA256).',
    'admin.unlock': 'Unlock',
    'admin.unlocking': 'Verifying…',
    'admin.lock': 'Lock',
    'admin.sessionUntil': 'session until',
    'admin.socLead':
      'Technical control map. Planned = code; organisation gap = audit process.',
    'admin.exportLead':
      'Evidence pack: users (no passwords), auth audit, faucet, blocks, pending, operations, controls.',
    'admin.exportAll': 'All (files)',
    'admin.opsOptional':
      'Operations snapshot reserved for the admin role — seed exports remain available.',
    'chain.title': 'Chain',
    'chain.view.list': 'List',
    'chain.view.graph': 'Graph',
    'chain.filter.wallet': 'Wallet',
    'chain.filter.from': 'From',
    'chain.filter.to': 'To',
    'chain.filter.search': 'Search',
    'chain.filter.reset': 'Reset',
    'chain.filter.results': '{count} results',
    'chain.export': 'Export',
    'chain.copyTip': 'Tip',
    'chain.copySuccess': 'Tip hash copied.',
    'chain.copyError': 'Copy failed.',
    'chain.exportSuccess': 'File downloaded.',
    'chain.valid': 'Valid',
    'chain.invalid': 'Invalid',
    'chain.syncing': 'Syncing…',
    'chain.errorSync': 'Sync error',
    'chain.empty': 'Empty chain',
    'chain.noMatch': 'No blocks for these filters.',
    'chain.retry': 'Retry',
    'chain.refresh': 'Refresh chain',
    'chain.viewMode': 'View mode',
    'chain.blocksLabel': 'blocks',
    'chain.syncedLabel': 'synced',
    'chain.syncingLabel': 'syncing',
    'quests.title': 'Quests',
    'quests.xp': 'XP',
    'quests.pendingRewards': 'R4V3',
    'quests.pendingRewardsHint': 'Pending quest rewards — wallet balance = on-chain',
    'quests.reset': 'Daily reset',
    'quests.refresh': 'Refresh quests',
    'quests.error': 'Quests unavailable — retry ↻',
    'quests.errorState': 'Quest state unavailable — local mode',
    'quests.errorCatalog': 'Catalogue unavailable — default quests',
    'quests.errorRateLimit': 'Too many requests — pause {seconds}',
    'quests.mission': 'Active mission',
    'quests.claim': 'Claim',
    'quests.details': 'Details',
    'quests.daily': 'Daily',
    'quests.auto': 'AUTO',
    'quests.autoHint': 'Server progress — reward to claim',
    'quests.weekly': 'Weekly',
    'quests.xpBoost': 'XP',
    'quests.claimWeekly': 'Claim weekly reward',
    'quests.crateLocked': 'Weekly crate',
    'quests.login': 'Log in',
    'quests.go': 'Go',
    'quests.walletLink': 'Link wallet',
    'quests.walletRequired': 'Create a wallet to receive the reward',
    'quests.claimSuccess': 'Reward claimed: {reward}',
    'quests.claimFailed': 'Unable to claim.',
    'quests.missionSuccess': 'Mission: {mts} R4V3 + {xp} XP',
    'quests.missionFailed': 'Mission not claimable.',
    'quests.weeklySuccess': 'Weekly reward: {mts} R4V3',
    'quests.weeklyFailed': 'Weekly reward unavailable.',
    'quests.autoDone': 'Credited automatically',
    'quests.done': 'Done',
    'quests.completed': 'completed',
    'quests.newQuestsIn': 'In',
    'quests.guardianRole': 'Active role',
    'quests.guardianTagline': 'Watch · Integrity · Rewards',
    'quests.weeklyClaimBtn': 'Claim',
    'quests.weeklyLockedHint': '{progress}',
    'wallet.title': 'Wallet / Explorer',
    'wallet.network': 'Network',
    'wallet.refresh': 'Refresh wallet',
    'wallet.create': 'Create wallet',
    'wallet.creating': 'Creating…',
    'wallet.noWallet': 'No active wallet.',
    'wallet.totalBalance': 'Total balance',
    'wallet.holdings.title': 'Other tokens',
    'wallet.holdings.others': 'others',
    'wallet.holdings.toggle': 'Show or hide swap tokens',
    'wallet.holdings.swapHint': 'Open exchange for this token',
    'wallet.fiatApprox': '{chf} CHF',
    'wallet.available': 'Available',
    'wallet.networkMetric': 'Network',
    'wallet.account': 'Account',
    'wallet.noAddress': 'No wallet',
    'wallet.send': 'Send',
    'wallet.swap': 'Swap',
    'wallet.receive': 'Receive',
    'wallet.mine': 'Mine',
    'wallet.mining': 'Mining…',
    'wallet.login': 'Log in',
    'wallet.explorer.title': 'Explore an address',
    'wallet.explorer.address': 'R4V3 address',
    'wallet.explorer.lookup': 'Look up',
    'wallet.explorer.useMine': 'My wallet',
    'wallet.explorer.result': 'Explored balance',
    'wallet.recent.title': 'Recent lookups',
    'wallet.recent.empty': 'No recent lookups',
    'wallet.recent.hint': 'Paste an address to look up',
    'wallet.keys.title': 'Wallet keys',
    'wallet.keys.public': 'Public key',
    'wallet.keys.private': 'Private key',
    'wallet.keys.show': 'Show key',
    'wallet.keys.hide': 'Hide',
    'wallet.keys.copy': 'Copy key',
    'wallet.keys.showPrivate': 'Show private key',
    'wallet.keys.privateWarning':
      'Sensitive private key: never share it and back it up offline.',
    'wallet.keys.confirmReveal': 'I understand this key grants access to the funds.',
    'wallet.keys.confirmReveal.ok': 'Show',
    'wallet.keys.confirmReveal.cancel': 'Cancel',
    'wallet.send.title': 'Send',
    'wallet.send.recipient': 'Recipient',
    'wallet.send.amount': 'Amount',
    'wallet.send.memo': 'Memo',
    'wallet.send.confirm': 'Confirm send',
    'wallet.send.sending': 'Sending…',
    'wallet.send.confirmTitle': 'Confirm transaction',
    'wallet.send.confirmHint': 'Check the recipient and amount before confirming.',
    'wallet.send.confirmYes': 'Yes, send',
    'wallet.send.confirmCancel': 'Cancel',
    'wallet.receive.title': 'Receive',
    'wallet.receive.addressLabel': 'Receive',
    'wallet.receive.copy': 'Copy address',
    'wallet.validation.recipient': 'Invalid recipient address.',
    'wallet.validation.amount': 'Minimum amount 0.0001 R4V3.',
    'faucet.title': 'Faucet',
    'faucet.subtitle': 'Claim on the m4t3r test network (R4V3 microcents) — login and wallet required',
    'faucet.refresh': 'Refresh faucet',
    'faucet.cooldown': 'Cooldown',
    'faucet.timeLeft': 'Time left',
    'faucet.claim': 'Claim',
    'faucet.claiming': 'Claiming…',
    'faucet.loginRequired': 'Login required',
    'faucet.walletRequired': 'Wallet required',
    'faucet.history': 'Claim history',
    'faucet.historyEmpty': 'No claims yet',
    'faucet.viewAll': 'View all',
    'faucet.viewLess': 'Show less',
    'faucet.network': 'Network',
    'faucet.peers': 'Peers',
    'faucet.block': 'Block',
    'faucet.txCopy': 'Copy transaction hash',
    'faucet.walletLinked': 'Wallet',
    'faucet.networkUnknown': 'Offline',
    'faucet.networkOnline': 'Network online',
    'faucet.networkOffline': 'Network offline',
    'faucet.claimAmountLabel': 'Claim amount',
    'faucet.claimPerDrop': '{amount} m4t3r / claim',
    'faucet.cooldownConfig': 'Cooldown {seconds} s',
    'faucet.nextEligibleAt': 'Next claim: {datetime}',
    'faucet.nextEligibleAtEmpty': 'Claim available',
    'faucet.claimSuccess': 'Claim queued — mine from Queue to validate the block.',
    'faucet.claimSuccessBalance': 'New balance: {balance} R4V3',
    'faucet.txExplorer': 'View in explorer',
    'faucet.txCopied': 'Transaction hash copied.',
    'faucet.txCopyFailed': 'Unable to copy hash.',
    'faucet.error.loginRequired': 'Log in to use the faucet.',
    'faucet.error.walletRequired': 'Create and link a wallet from the Wallet tab.',
    'faucet.error.claimFailed': 'Unable to claim.',
    'faucet.error.loadFailed': 'Unable to load the faucet.',
    'faucet.error.loadConfigFailed': 'Unable to load faucet configuration.',
    'faucet.claimIncrementHint': '+1 m4t3r / second until claim',
    'faucet.networkHint': 'Network the faucet is connected to',
    'faucet.peersHint': 'Synced peer nodes (1 = this node alone locally)',
    'faucet.blockHint': 'Chain height: number of mined blocks (#18 = 18 blocks)',
    'faucet.peersConnectedOnly': '{count} connected',
    'faucet.peersConnectedTotal': '{connected} / {total} connected',
    'faucet.disabled': 'The faucet is disabled on this deployment.',
    'faucet.offline': 'Network unavailable — automatic retry…',
    'faucet.retry': 'Retry',
    'faucet.atMaxClaim': 'Cap {max} {token} reached',
    'faucet.blockExplorer': 'View block',
    'faucet.exportHistory': 'Export history',
    'faucet.loadMore': 'Load more',
    'faucet.walletInvalidHint': '{prefix} address required for this faucet.',
    'faucet.error.walletInvalid': 'Invalid wallet address for the R4V3 network.',
    'faucet.error.rateLimited': 'Too many requests — try again in a moment.',
    'faucet.error.featureDisabled': 'The faucet is disabled (403).',
    'faucet.error.offline': 'Unable to reach the faucet.',
    'peers.title': 'Peers',
    'peers.networkPeers': 'Peers',
    'peers.avgLatency': 'Latency',
    'peers.networkLoad': 'Load',
    'peers.search': 'Filter',
    'peers.filterAll': 'ALL',
    'peers.filterConnected': 'OK',
    'peers.filterFavorites': 'FAVORITES',
    'peers.connect': 'Connect',
    'peers.connectPeer': 'Connect a peer',
    'peers.loginRequired': 'Log in',
    'peers.refresh': 'Refresh peers',
    'peers.copy': 'Copy',
    'peers.retry': 'Retry',
    'peers.empty': 'No peers. Use + to add one.',
    'peers.emptyFilter': 'No peers for this filter.',
    'peers.summary': '{connected}/{total} connected',
    'peers.statusConnected': 'OK',
    'peers.statusConnecting': '…',
    'peers.statusDisconnected': 'OFF',
    'peers.statusError': 'ERROR',
    'peers.errorLoad': 'Unable to load peers.',
    'peers.errorConnect': 'Unable to connect this peer.',
    'peers.errorReconnect': 'Unable to reconnect this peer.',
    'peers.errorCopy': 'Unable to copy URL.',
    'peers.errorLoginAdd': 'Log in to add a peer.',
    'peers.errorLoginReconnect': 'Log in to reconnect a peer.',
    'peers.errorInvalidUrl': 'Invalid peer address.',
    'peers.errorInvalidFormat': 'Invalid format — use ws:// or wss://.',
    'peers.successAdded': 'Peer added',
    'peers.successReconnected': 'Peer reconnected',
    'peers.successCopied': 'URL copied.',
    'peers.connectPlaceholder': 'ws://host:port/ws/peers',
    'peers.favAdd': 'Add to favorites',
    'peers.favRemove': 'Remove from favorites',
    'peers.disconnect': 'Disconnect',
    'peers.errorDisconnect': 'Unable to disconnect this peer.',
    'peers.errorLoginDisconnect': 'Log in to disconnect a peer.',
    'peers.successDisconnected': 'Peer disconnected',
    'peers.estimated': 'estimated',
    'peers.errorRateLimit': 'Too many requests — retry in {seconds}.',
    'peers.errorStats': 'Network stats unavailable.',
    'peers.detailTitle': 'Peer detail',
    'peers.detailClose': 'Close peer detail',
    'peers.detailUrl': 'URL',
    'peers.detailStatus': 'Status',
    'peers.detailMessage': 'Message',
    'peers.detailLatency': 'Latency',
    'peers.detailSync': 'Sync',
    'peers.detailLastSync': 'Last sync',
    'peers.detailChainHeight': 'Chain height',
    'peers.openDetail': 'View peer detail',
    'auth.eyebrow': 'R4V3 account',
    'auth.loginTitle': 'Log in',
    'auth.registerTitle': 'Sign up',
    'auth.tabLogin': 'Log in',
    'auth.tabRegister': 'Sign up',
    'auth.tabListLabel': 'Sign up or log in',
    'auth.identifier': 'Identifier',
    'auth.username': 'Username',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.identifierPlaceholder': 'rutkarf or you@example.com',
    'auth.usernamePlaceholder': 'rutkarf',
    'auth.emailPlaceholder': 'you@example.com',
    'auth.passwordPlaceholder': '••••••••',
    'auth.passwordRegisterPlaceholder': '8 characters minimum',
    'auth.showPassword': 'Show',
    'auth.hidePassword': 'Hide',
    'auth.submitLogin': 'Log in',
    'auth.submitLoginLoading': 'Logging in…',
    'auth.submitRegister': 'Create my account',
    'auth.submitRegisterLoading': 'Creating…',
    'auth.orContinueWith': 'or continue with',
    'auth.google': 'Google',
    'auth.meta': 'Meta',
    'auth.apple': 'Apple',
    'auth.microsoft': 'Microsoft',
    'auth.github': 'GitHub',
    'auth.x': 'X',
    'auth.discord': 'Discord',
    'auth.oauthUnavailable': 'Not configured on this server',
    'auth.oauthMock': 'Local demo login — account created in DB (no real provider)',
    'auth.oauthRedirecting': 'Redirecting…',
    'auth.close': 'Close',
    'auth.emailCodeTitle': 'Confirm your email',
    'auth.emailCodeHint': 'A 6-digit code was sent to',
    'auth.emailCodeLabel': 'Code from email',
    'auth.emailCodeSubmit': 'Confirm',
    'auth.emailResend': 'Resend code',
    'auth.twoFactorTitle': 'Two-factor authentication',
    'auth.twoFactorHint': 'Enter the 6-digit code from your authenticator app.',
    'auth.twoFactorLabel': 'Two-factor code',
    'auth.twoFactorSubmit': 'Verify',
    'auth.twoFactorOpen': 'Enable two-factor authentication',
    'auth.twoFactorSetupHint': 'Add this key in an authenticator app, then enter the displayed code.',
    'auth.twoFactorSecret': 'Secret key',
    'auth.twoFactorEnable': 'Enable',
    'auth.twoFactorDisableHint': 'Enter a code from your app to disable two-factor authentication.',
    'auth.twoFactorDisable': 'Disable',
    'auth.challengeBack': 'Back',
    'auth.validation.required': 'Required field',
    'auth.validation.identifierMin': '3 characters minimum',
    'auth.validation.usernamePattern': 'Letters, digits and _ only',
    'auth.validation.email': 'Invalid email',
    'auth.validation.passwordMin': '8 characters minimum',
    'auth.switchToRegister': 'No account yet? Sign up',
    'auth.switchToLogin': 'Already have an account? Log in',
  },
};

export function translate(locale: AppLocale, key: LocaleKey): string {
  return MESSAGES[locale][key] ?? key;
}

export function nextLocale(_locale: AppLocale): AppLocale {
  return 'en';
}
