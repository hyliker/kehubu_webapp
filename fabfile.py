from fabric.api import task, env, run, cd

env.user = 'kehubu'
env.hosts = ['kehubu.com']
home_dir = '/home/kehubu'
project_dir = '/home/kehubu/kehubu_webapp/'


@task
def update():
    with cd(project_dir):
        run('git reset --hard')
        run('git pull')
        run('git submodule update')


@task
def yarn(cmd):
    with cd(project_dir):
        run('yarn {}'.format(cmd))
