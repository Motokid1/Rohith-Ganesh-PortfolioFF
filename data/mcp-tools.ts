export const tools = {
  Cost: [
    'get_cost_breakdown',
    'get_cost_forecast',
    'find_cost_anomalies',
    'get_free_tier_usage',
  ],
  Security: [
    'find_public_buckets',
    'audit_iam_users',
    'check_open_security_groups',
    'get_root_account_status',
  ],
  Resources: [
    'list_running_resources',
    'find_unused_ebs_volumes',
    'find_unused_elastic_ips',
    'find_old_snapshots',
  ],
  Operations: ['get_lambda_logs', 'get_lambda_metrics', 'list_active_alarms'],
  Reports: [
    'generate_account_health_report',
    'request_account_scan',
    'get_scan_status',
  ],
  Advice: ['explain_aws_service', 'echo'],
};
