
function save_options() {
  console.log('saving...');
  var verbosity     = document.getElementById('verbosity').value;
  var save_file     = document.getElementById('save_file').value;
  var delay         = document.getElementById('delay').value;
  var hard_deadline = document.getElementById('hard_deadline').value;

  chrome.storage.sync.set({
    verbosity: verbosity,
    save_file: save_file,
    delay: delay,
    hard_deadline: hard_deadline
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

  console.log('SAVED');
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  console.log("restoring")
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    verbosity: 'OUTPUT',
    save_file: 0, 
    delay: 1000,
    hard_deadline: 10000
  }, function(items) {
    document.getElementById('verbosity').value     = items.verbosity;
    document.getElementById('save_file').value     = items.save_file;
    document.getElementById('delay').value         = items.delay;
    document.getElementById('hard_deadline').value = items.hard_deadline;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);