const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
	try {
		await exec.exec('git', ['clone', 'https://github.com/tiabeast/bait.git', './bait'])

		process.chdir('./bait')
		await exec.exec('./make.sh')
		await exec.exec('./bait', ['symlink'])

		core.setOutput('bait-path', './bait')
		core.setOutput('version', 'x.x.x') // TODO get dynamically
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
