Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/xenial64"

  config.vm.network "private_network", ip: "192.168.33.33"

  config.vm.synced_folder ".", "/vagrant", :nfs => { :mount_options => ["dmode=777","fmode=777"] }

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = 2048
    vb.cpus = 2
  end

  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.ignore_private_ip = false
  config.hostmanager.include_offline = true

  config.vm.define "stryve-dev" do |node|
    node.vm.hostname = "dev.stryve.com"
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    ansible.inventory_path = "ansible/inventories/dev"
    ansible.limit = "all"
  end

  config.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"
end
