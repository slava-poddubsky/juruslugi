Vagrant.configure("2") do |config|
  config.vm.boot_timeout = 600
  config.vm.box = "bento/ubuntu-20.04"
  config.vm.box_check_update = false
  config.vm.network "forwarded_port", guest: 8080, host: 80
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.synced_folder "web", "/mnt/web"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
  config.vm.provision "ansible" do |ansible|
    ansible.limit = "all"
    ansible.inventory_path = "ansible/hosts"
    ansible.playbook = "ansible/vagrant.yaml"
  end
end
